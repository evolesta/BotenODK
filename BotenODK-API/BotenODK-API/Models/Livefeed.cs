namespace BotenODK_API.Models
{
    public class Livefeed
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? MaxDuration { get; set; }
        public string? Filepath { get; set; }
        
        // Relationships
        public List<ObjectDetection>? Objects { get; set; }
    }
}
