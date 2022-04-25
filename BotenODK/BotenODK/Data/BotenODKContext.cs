#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BotenODK.Models;

namespace BotenODK.Data
{
    public class BotenODKContext : DbContext
    {
        public BotenODKContext (DbContextOptions<BotenODKContext> options)
            : base(options)
        {
        }

        public DbSet<BotenODK.Models.User> User { get; set; }
    }
}
