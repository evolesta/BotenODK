namespace BotenODK_API.Models
{
    public class FeedQueue
    {
        public int Id { get; set; }
        public string? Filepath { get; set; }
        public DateTime Timestamp { get; set; }
        
        public Statusses Status { get; set; }
        public bool Deleted { get; set; }
        public int Feed { get; set; }

        public enum Statusses
        {
            New,
            InProgress,
            Successful,
            Deleted
        }
    }
}
