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
            feedQueue.Timestamp = DateTime.Now; // save current Datetime into Db
            _context.FeedQueue.Add(feedQueue);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFeedQueue", new { id = feedQueue.Id }, feedQueue);
        }

        // GET: api/GetNewQueueItems
        // Returns the last created queue item to process first
        [HttpGet]
        [Route("GetNewQueueItems")]
        public async Task<ActionResult<IEnumerable<FeedQueue>>> GetQueueItem(int limit)
        {
            // if there's no limit specified or 0, at least return 100 queue items
            if (limit == 0)
                limit = 100;

            // Get the latest queue item from the lowest ID available and status = New
            var queueItem = await _context.FeedQueue.Where(q => q.Status == FeedQueue.Statusses.New)
                .OrderBy(x => x.Timestamp)
                .Take(limit)
                .ToListAsync();

            return queueItem;
        }

        // GET: api/NextPhase
        // Sets the queue item status to the next fase (to inProgress, Successfull)
        [HttpPost]
        [Route("NextPhase/{id}")]
        public async Task<IActionResult> NextPhase(int id)
        {
            var queueItem = await _context.FeedQueue.FindAsync(id);
            if (queueItem == null)
                return NotFound();

            switch (queueItem.Status)
            {
                case FeedQueue.Statusses.New:
                    queueItem.Status = FeedQueue.Statusses.InProgress;
                    break;
                case FeedQueue.Statusses.InProgress:
                    queueItem.Status = FeedQueue.Statusses.Successful;
                    break;
                case FeedQueue.Statusses.Successful:
                    return BadRequest("Unable to modify a queue item which is already processed");
                case FeedQueue.Statusses.Deleted:
                    return BadRequest("Queue item is deleted, can't modify that");
                default:
                    return BadRequest("Unkown status in database, please contact a administrator!");
            }

            _context.Entry(queueItem).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedQueueExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/FeedQueues/delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var queueItem = await _context.FeedQueue.FindAsync(id);
            if (queueItem == null)
                return NotFound();

            queueItem.Deleted = true;
            queueItem.Status = FeedQueue.Statusses.Deleted;
            _context.Entry(queueItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedQueueExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        private bool FeedQueueExists(int id)
        {
            return _context.FeedQueue.Any(e => e.Id == id);
        }
    }
}
