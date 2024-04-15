using FederataFutbollit.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace FederataFutbollit.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Superliga> Superligat { get; set; }
        public DbSet<Selektori>Selektort{get;set;}
    }


}
