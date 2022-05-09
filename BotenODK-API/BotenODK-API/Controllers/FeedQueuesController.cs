#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BotenODK_API.Data;
using BotenODK_API.Models;
using Microsoft.AspNetCore.Authorization;

namespace BotenODK_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FeedQueuesController : ControllerBase
    {
        private readonly BotenODK_APIContext _context;

        public FeedQueuesController(BotenODK_APIContext context)
        {
            _context = context;
        }

        // GET: api/FeedQueues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedQueue>>> GetFeedQueue()
        {
            return await _context.FeedQueue.ToListAsync();
        }

        // GET: api/FeedQueues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FeedQueue>> GetFeedQueue(int id)
        {
            var feedQueue = await _context.FeedQueue.FindAsync(id);

            if (feedQueue == null)
            {
                return NotFound();
            }

            return feedQueue;
        }

        // PUT: api/FeedQueues/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedQueue(int id, FeedQueue feedQueue)
        {
            if (id != feedQueue.Id)
            {
                return BadRequest();
            }

            _context.Entry(feedQueue).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedQueueExists(id))
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

        // POST: api/FeedQueues
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FeedQueue>> PostFeedQueue(FeedQueue feedQueue)
        {
            _context.FeedQueue.Add(feedQueue);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFeedQueue", new { id = feedQueue.Id }, feedQueue);
        }

        // DELETE: api/FeedQueues/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedQueue(int id)
        {
            var feedQueue = await _context.FeedQueue.FindAsync(id);
            if (feedQueue == null)
            {
                return NotFound();
            }

            _context.FeedQueue.Remove(feedQueue);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FeedQueueExists(int id)
        {
            return _context.FeedQueue.Any(e => e.Id == id);
        }
    }
}
