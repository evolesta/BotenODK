namespace BotenODK_API.Models
{
    public class Livefeed
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }   
        public string? URL { get; set; }
        public bool Enabled { get; set; }
    }
}
