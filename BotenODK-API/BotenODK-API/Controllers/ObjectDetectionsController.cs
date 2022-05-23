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
    public class ObjectDetectionsController : ControllerBase
    {
        private readonly BotenODK_APIContext _context;

        public ObjectDetectionsController(BotenODK_APIContext context)
        {
            _context = context;
        }

        // GET: api/ObjectDetections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ObjectDetection>>> GetObjectDetection()
        {
            return await _context.ObjectDetection.ToListAsync();
        }

        // GET: api/ObjectDetections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectDetection>> GetObjectDetection(int id)
        {
            var objectDetection = await _context.ObjectDetection.FindAsync(id);

            if (objectDetection == null)
            {
                return NotFound();
            }

            return objectDetection;
        }

        // PUT: api/ObjectDetections/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutObjectDetection(int id, ObjectDetection objectDetection)
        {
            if (id != objectDetection.Id)
            {
                return BadRequest();
            }

            _context.Entry(objectDetection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObjectDetectionExists(id))
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

        // POST: api/ObjectDetections
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ObjectDetection>> PostObjectDetection(ObjectDetection objectDetection)
        {
            _context.ObjectDetection.Add(objectDetection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetObjectDetection", new { id = objectDetection.Id }, objectDetection);
        }

        // DELETE: api/ObjectDetections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObjectDetection(int id)
        {
            var objectDetection = await _context.ObjectDetection.FindAsync(id);
            if (objectDetection == null)
            {
                return NotFound();
            }

            _context.ObjectDetection.Remove(objectDetection);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ObjectDetectionExists(int id)
        {
            return _context.ObjectDetection.Any(e => e.Id == id);
        }
    }
}
