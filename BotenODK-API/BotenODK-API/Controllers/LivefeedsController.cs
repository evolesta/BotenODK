#nullable disable
using BotenODK_API.Data;
using BotenODK_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BotenODK_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LivefeedsController : ControllerBase
    {
        private readonly BotenODK_APIContext _context;

        public LivefeedsController(BotenODK_APIContext context)
        {
            _context = context;
        }

        // GET: api/Livefeeds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Livefeed>>> GetLivefeed()
        {
            return await _context.Livefeed.ToListAsync();
        }

        // GET: api/Livefeeds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Livefeed>> GetLivefeed(int id)
        {
            var livefeed = await _context.Livefeed.FindAsync(id);

            if (livefeed == null)
            {
                return NotFound();
            }

            return livefeed;
        }

        // PUT: api/Livefeeds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLivefeed(int id, Livefeed livefeed)
        {
            if (id != livefeed.Id)
            {
                return BadRequest();
            }

            _context.Entry(livefeed).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LivefeedExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Livefeeds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Livefeed>> PostLivefeed(Livefeed livefeed)
        {
            _context.Livefeed.Add(livefeed);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLivefeed", new { id = livefeed.Id }, livefeed);
        }

        // DELETE: api/Livefeeds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLivefeed(int id)
        {
            var livefeed = await _context.Livefeed.FindAsync(id);
            if (livefeed == null)
            {
                return NotFound();
            }

            _context.Livefeed.Remove(livefeed);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LivefeedExists(int id)
        {
            return _context.Livefeed.Any(e => e.Id == id);
        }
    }
}
