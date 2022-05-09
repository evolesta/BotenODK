namespace BotenODK_API.Models
{
    public class DetectedData
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string? Description { get; set; }
        public TypeObject State { get; set; }
        public enum TypeObject
        {
            Moving,
            Stationary
        }

        // relation
        public int DataModelId { get; set; }
        public DataModel? DataModel { get; set; }
    }
}
