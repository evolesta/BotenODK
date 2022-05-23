using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BotenODK_API.Data;
using BotenODK_API.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

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

        // POST: api/token
        [HttpPost]
        public async Task<IActionResult> createToken(User user)
        {
            // check if the username and password are submitted in the body of the request
            if (user.Username != null && user.Password != null)
            {
                // get userdata from database and verify password
                var userData = await _context.User.FirstOrDefaultAsync(u => u.Username == user.Username);
                if (userData != null)
                {
                    if (BCrypt.Net.BCrypt.Verify(user.Password, userData.Password))
                    {
                        // generate a new token and response it to the requester
                        var tokenkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
                        var SignIn = new SigningCredentials(tokenkey, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                            _config["JWT:Issuer"],
                            _config["JWT:Audience"],
                            claims: new[]
                            {
                                new Claim("Username", user.Username)
                            },
                            expires: DateTime.Now.AddMinutes(60),
                            signingCredentials: SignIn);

                        return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                    }
                    else
                        return BadRequest();
                }
                else
                    return NotFound();
            }
            else
                // no username and password, return a error
                return BadRequest();
        }
    }
}
