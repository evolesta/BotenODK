using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BotenODK_API.Data;
using BotenODK_API.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;

namespace BotenODK_API.Controllers
{
    [Route("api/token")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly BotenODK_APIContext _context;
        private readonly IConfiguration _config;

        public TokenController(BotenODK_APIContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [Route("authorize")]
        [HttpPost]
        public async Task<IActionResult> createAuthCode(Credentials credentials)
        {
            // check if all required body parameters are available
            if (credentials.Username == null || credentials.Password == null)
                return BadRequest();

            // get user from database - check if it returns a user
            var userData = await _context.User.FirstOrDefaultAsync(u => u.Username == credentials.Username);
            if (userData == null)
                return BadRequest();

            // check if the password is valid
            if (BCrypt.Net.BCrypt.Verify(credentials.Password, userData.Password))
            {
                // password is valid - generate a new token
                var key = _config["EncKey"];
                var checksum = RandomString();
                var authToken = Cryptography.AES.Encrypt(credentials.Username + ":" + checksum, key);

                // save token to database
                userData.AuthToken = authToken;
                userData.checksum = checksum;
                _context.Entry(userData).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                // return token to requester
                return Ok(new { authToken = authToken });
            }
            else
                return BadRequest(); // password invalid
        }

        // POST: api/token
        // lets the user authorize and provides a access token
        [HttpPost]
        public async Task<IActionResult> CreateAccessToken(AuthToken authtoken)
        {
            if (authtoken.grant_type == null)
                return BadRequest();

            switch (authtoken.grant_type)
            {
                default:
                    return BadRequest();

                case "auth_token":
                    if (authtoken.authtoken == null)
                        return BadRequest();

                    var userData = await _context.User.FirstOrDefaultAsync(u => u.AuthToken == authtoken.authtoken);
                    if (userData == null)
                        return BadRequest();

                    var key = _config["EncKey"];
                    var decryptedToken = Cryptography.AES.Decrypt(authtoken.authtoken, key);
                    var tokenArray = decryptedToken.Split(":", StringSplitOptions.None);

                    // check if the username are equal from token and db
                    if (userData.Username == tokenArray[0])
                    {
                        // check if checksum from token equals with the DB
                        if (tokenArray[1] == userData.checksum)
                            // generate a new token and response it to the requester
                            return Ok(new { token = GenerateAccessToken(userData.Username, userData.Role) });
                        else
                            return BadRequest();
                    }
                    else
                        return BadRequest();

                case "password":
                    // check if body parameters are available
                    if (authtoken.username == null || authtoken.password == null)
                        return BadRequest();

                    // get userdata from database
                    var UserData = await _context.User.FirstOrDefaultAsync(x => x.Username == authtoken.username);
                    if (UserData == null)
                        return BadRequest();

                    // validate the user password
                    if (BCrypt.Net.BCrypt.Verify(authtoken.password, UserData.Password))
                    {
                        // password is valid - generate access token
                        return Ok(new { token = GenerateAccessToken(authtoken.username, UserData.Role) });
                    }
                    else
                        return BadRequest();
            }
        }

        // used to generate a fresh new access jwt token
        private string GenerateAccessToken(string username, string role)
        {
            var tokenkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var SignIn = new SigningCredentials(tokenkey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _config["JWT:Issuer"],
                _config["JWT:Audience"],
                claims: new[]
                {
                        new Claim("Username", username),
                        new Claim(ClaimTypes.Role, role),
                },
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_config["JWT:TokenExpiration"])),
                signingCredentials: SignIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string RandomString()
        {
            const string src = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            int length = 32;
            var rnd = new Random();
            var result = "";

            for (int i = 0; i < length; i++)
            {
                var c = src[rnd.Next(0, src.Length)];
                result = result + c;
            }

            return result;
        }
    }

    public class Credentials
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }

    public class AuthToken
    {
        public string? grant_type { get; set; }
        public string? authtoken { get; set; }
        public string? username { get; set; }
        public string? password { get; set; }
    }
}
