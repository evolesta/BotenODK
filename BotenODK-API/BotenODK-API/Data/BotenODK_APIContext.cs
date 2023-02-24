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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    FirstName = "Test",
                    LastName = "Gebruiker",
                    Email = "info@veela.nl",
                    Username = "test",
                    Password = BCrypt.Net.BCrypt.HashPassword("TEST123"),
                    Role = "Administrator"
                }
                );
        }

        public DbSet<BotenODK_API.Models.User> User { get; set; }

        public DbSet<BotenODK_API.Models.FeedQueue> FeedQueue { get; set; }

        public DbSet<BotenODK_API.Models.Livefeed> Livefeed { get; set; }

        public DbSet<BotenODK_API.Models.DataModel> DataModel { get; set; }

        public DbSet<BotenODK_API.Models.DetectedData> DetectedData { get; set; }
    }
}
