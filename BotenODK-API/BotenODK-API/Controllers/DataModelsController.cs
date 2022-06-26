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
    public class DataModelsController : ControllerBase
    {
        private readonly BotenODK_APIContext _context;

        public DataModelsController(BotenODK_APIContext context)
        {
            _context = context;
        }

        // GET: api/DataModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DataModel>>> GetDataModel()
        {
            return await _context.DataModel.ToListAsync();
        }

        // GET: api/DataModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DataModel>> GetDataModel(int id)
        {
            var dataModel = await _context.DataModel.FindAsync(id);

            if (dataModel == null)
            {
                return NotFound();
            }

            return dataModel;
        }

        // PUT: api/DataModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDataModel(int id, DataModel dataModel)
        {
            if (id != dataModel.DataModelId)
            {
                return BadRequest();
            }

            _context.Entry(dataModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DataModelExists(id))
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

        // POST: api/DataModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DataModel>> PostDataModel(DataModel dataModel)
        {
            _context.DataModel.Add(dataModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDataModel", new { id = dataModel.DataModelId }, dataModel);
        }

        // DELETE: api/DataModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDataModel(int id)
        {
            var dataModel = await _context.DataModel.FindAsync(id);
            if (dataModel == null)
            {
                return NotFound();
            }

            _context.DataModel.Remove(dataModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DataModelExists(int id)
        {
            return _context.DataModel.Any(e => e.DataModelId == id);
        }
    }
}
