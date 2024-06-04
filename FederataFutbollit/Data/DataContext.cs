using FederataFutbollit.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FederataFutbollit.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Superliga> Superligat { get; set; }
        public DbSet<Selektori> Selektort { get; set; }
        public DbSet<Stafi> Stafi { get; set; }
        public DbSet<Shteti> Shteti { get; set; }
        public DbSet<Kombetarja> Kombetarja { get; set; }
        public DbSet<Lojtaret> Lojtaret { get; set; }
        public DbSet<LojtaretSuperlige> LojtaretSuperlige { get; set; }
        public DbSet<Roli> Roli { get; set; }
        public DbSet<Stadiumi> Stadiumi { get; set; }
        public DbSet<Kompeticionet> Kompeticionet { get; set; }
        public DbSet<Ndeshja> Ndeshja { get; set; }
        public DbSet<Statusi> Statusi { get; set; }
        public DbSet<Bileta> Biletat { get; set; }
        public DbSet<Ulesja> Uleset { get; set; }
        public DbSet<SektoriUlseve> SektoriUlseve { get; set; }
        public DbSet<Ekipa> Ekipa { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartSeat> CartSeats { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<NdeshjaSuperliges> NdeshjetESuperliges { get; set; }
        public DbSet<AboutSection> AboutSections { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Kontabiliteti> Kontabiliteti { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Identity entity configuration
            modelBuilder.Entity<IdentityUserLogin<string>>(b =>
            {
                b.HasKey(l => new { l.LoginProvider, l.ProviderKey });
            });

            modelBuilder.Entity<IdentityUserRole<string>>(b =>
            {
                b.HasKey(r => new { r.UserId, r.RoleId });
            });

            modelBuilder.Entity<IdentityUserToken<string>>(b =>
            {
                b.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
            });

            // Configuring relations for Ndeshja
            modelBuilder.Entity<Ndeshja>()
                .HasOne(n => n.Kombetarja)
                .WithMany(k => k.Ndeshjet)
                .HasForeignKey(n => n.KombetarjaId)
                .OnDelete(DeleteBehavior.NoAction);

            // Configuring Ekipa relationship
            modelBuilder.Entity<Ekipa>()
                .HasOne(e => e.Superliga)
                .WithMany(s => s.Ekipa)
                .HasForeignKey(e => e.SuperligaId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuring relations for NdeshjaSuperliges
            modelBuilder.Entity<NdeshjaSuperliges>()
                .HasOne(n => n.Superliga)
                .WithMany(s => s.NdeshjetESuperliges)
                .HasForeignKey(n => n.SuperligaId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<NdeshjaSuperliges>()
                .HasOne(n => n.Ekipa)
                .WithMany(e => e.NdeshjetESuperliges)
                .HasForeignKey(n => n.EkipaId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<NdeshjaSuperliges>()
                .HasOne(n => n.Statusi)
                .WithMany(s => s.NdeshjetESuperliges)
                .HasForeignKey(n => n.StatusiId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
