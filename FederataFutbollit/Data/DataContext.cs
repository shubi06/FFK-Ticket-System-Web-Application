using FederataFutbollit.Entities;
using FederataFutbollit.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace FederataFutbollit.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : IdentityDbContext<ApplicationUser>(options)
    {
        
        public DbSet<Superliga> Superligat { get; set; }
        public DbSet<Selektori>Selektort{get;set;}
        public DbSet<Stafi> Stafi { get; set; }
         

        public DbSet<Shteti> Shteti { get; set; }

        public DbSet<Kombetarja> Kombetarja { get; set; }

        public DbSet<Lojtaret> Lojtaret { get; set; }


    }


}
