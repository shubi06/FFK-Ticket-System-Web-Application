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

<<<<<<< HEAD
         
=======
        public DbSet<Shteti> Shteti { get; set; }

        public DbSet<Kombetarja> Kombetarja { get; set; }

        public DbSet<Lojtaret> Lojtaret { get; set; }

>>>>>>> d3f25df74f18502bf39415111902c9e358b4b582
    }


}
