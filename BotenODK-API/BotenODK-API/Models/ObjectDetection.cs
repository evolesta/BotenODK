namespace BotenODK_API.Models
{
    public class ObjectDetection
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double SensityMovement { get; set; }

        // relationships
        public int LivefeedId { get; set; }
        public Livefeed? Livefeed { get; set; }
    }
}
