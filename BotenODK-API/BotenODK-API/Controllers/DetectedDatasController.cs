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
    public class DetectedDatasController : ControllerBase
    {
        private readonly BotenODK_APIContext _context;

        public DetectedDatasController(BotenODK_APIContext context)
        {
            _context = context;
        }

        // GET: api/DetectedDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetectedData>>> GetDetectedData()
        {
            return await _context.DetectedData.ToListAsync();
        }

        // GET: api/DetectedDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetectedData>> GetDetectedData(int id)
        {
            var detectedData = await _context.DetectedData.FindAsync(id);

            if (detectedData == null)
            {
                return NotFound();
            }

            return detectedData;
        }

        // PUT: api/DetectedDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetectedData(int id, DetectedData detectedData)
        {
            if (id != detectedData.Id)
            {
                return BadRequest();
            }

            _context.Entry(detectedData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetectedDataExists(id))
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

        // POST: api/DetectedDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DetectedData>> PostDetectedData(DetectedData detectedData)
        {
            detectedData.Timestamp = DateTime.Now;
            _context.DetectedData.Add(detectedData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetectedData", new { id = detectedData.Id }, detectedData);
        }

        // DELETE: api/DetectedDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetectedData(int id)
        {
            var detectedData = await _context.DetectedData.FindAsync(id);
            if (detectedData == null)
            {
                return NotFound();
            }

            _context.DetectedData.Remove(detectedData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetectedDataExists(int id)
        {
            return _context.DetectedData.Any(e => e.Id == id);
        }
    }
}
