namespace BotenODK_API.Models
{
    public class DataModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? COCOKey { get; set; }
        
        // relation
        public List<DetectedData>? Data { get; set; }
    }
}
