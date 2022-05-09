#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BotenODK_API.Models;

namespace BotenODK_API.Data
{
    public class BotenODK_APIContext : DbContext
    {
        public BotenODK_APIContext (DbContextOptions<BotenODK_APIContext> options)
            : base(options)
        {
        }

        public DbSet<BotenODK_API.Models.User> User { get; set; }

        public DbSet<BotenODK_API.Models.FeedQueue> FeedQueue { get; set; }

        public DbSet<BotenODK_API.Models.Livefeed> Livefeed { get; set; }

        public DbSet<BotenODK_API.Models.ObjectDetection> ObjectDetection { get; set; }

        public DbSet<BotenODK_API.Models.DataModel> DataModel { get; set; }

        public DbSet<BotenODK_API.Models.DetectedData> DetectedData { get; set; }
    }
}
