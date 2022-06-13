using System.ComponentModel.DataAnnotations.Schema;

namespace BotenODK_API.Models
{
    public class DetectedData
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string? Description { get; set; }
        
        // relations
        public int? DataModelId { get; set; }
        public DataModel? DataModel { get; set; }
    }
}
