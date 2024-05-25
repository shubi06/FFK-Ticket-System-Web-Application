﻿// <auto-generated />
using System;
using FederataFutbollit.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FederataFutbollit.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240525123904_UpdateKompeticionetModel")]
    partial class UpdateKompeticionetModel
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FederataFutbollit.Data.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Kombetarja", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ShtetiID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ShtetiID")
                        .IsUnique();

                    b.ToTable("Kombetarja");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Kompeticionet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Kompeticionet");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Lojtaret", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Asiste")
                        .HasColumnType("int");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FotoPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Gola")
                        .HasColumnType("int");

                    b.Property<int>("KombetarjaID")
                        .HasColumnType("int");

                    b.Property<string>("Mbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Mosha")
                        .HasColumnType("int");

                    b.Property<int>("NrFaneles")
                        .HasColumnType("int");

                    b.Property<string>("Pozicioni")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("KombetarjaID");

                    b.ToTable("Lojtaret");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Ndeshja", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Data")
                        .HasColumnType("datetime2");

                    b.Property<string>("EkipiKundershtar")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GolaEkipiJone")
                        .HasColumnType("int");

                    b.Property<int>("GolaEkipiKundershtar")
                        .HasColumnType("int");

                    b.Property<int>("KombetarjaId")
                        .HasColumnType("int");

                    b.Property<int>("KompeticioniId")
                        .HasColumnType("int");

                    b.Property<int>("StadiumiId")
                        .HasColumnType("int");

                    b.Property<int>("StatusiId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KombetarjaId");

                    b.HasIndex("KompeticioniId");

                    b.HasIndex("StadiumiId");

                    b.HasIndex("StatusiId");

                    b.ToTable("Ndeshja");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Roli", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roli");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Selektori", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("KombetarjaID")
                        .HasColumnType("int");

                    b.Property<string>("Mbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Mosha")
                        .HasColumnType("int");

                    b.Property<string>("Nacionaliteti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VitetEKontrates")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KombetarjaID")
                        .IsUnique();

                    b.ToTable("Selektort");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Shteti", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Shteti");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Stadiumi", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Kapaciteti")
                        .HasColumnType("int");

                    b.Property<int>("KombetarjaID")
                        .HasColumnType("int");

                    b.Property<int>("VitiNdertuar")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KombetarjaID");

                    b.ToTable("Stadiumi");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Stafi", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("KombetarjaID")
                        .HasColumnType("int");

                    b.Property<string>("Mbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Paga")
                        .HasColumnType("int");

                    b.Property<int>("RoliID")
                        .HasColumnType("int");

                    b.Property<int>("Telefoni")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KombetarjaID");

                    b.HasIndex("RoliID");

                    b.ToTable("Stafi");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Statusi", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Statusi");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Superliga", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumriSkuadrave")
                        .HasColumnType("int");

                    b.Property<string>("Sponzori")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Superligat");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Kombetarja", b =>
                {
                    b.HasOne("FederataFutbollit.Entities.Shteti", "Shteti")
                        .WithOne("Kombetarja")
                        .HasForeignKey("FederataFutbollit.Entities.Kombetarja", "ShtetiID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Shteti");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Lojtaret", b =>
                {
                    b.HasOne("FederataFutbollit.Entities.Kombetarja", "Kombetarja")
                        .WithMany("Lojtaret")
                        .HasForeignKey("KombetarjaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kombetarja");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Ndeshja", b =>
                {
                    b.HasOne("FederataFutbollit.Entities.Kombetarja", "Kombetarja")
                        .WithMany("Ndeshjet")
                        .HasForeignKey("KombetarjaId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("FederataFutbollit.Entities.Kompeticionet", "Kompeticioni")
                        .WithMany("Ndeshja")
                        .HasForeignKey("KompeticioniId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FederataFutbollit.Entities.Stadiumi", "Stadiumi")
                        .WithMany("Ndeshjet")
                        .HasForeignKey("StadiumiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FederataFutbollit.Entities.Statusi", "Statusi")
                        .WithMany("Ndeshjet")
                        .HasForeignKey("StatusiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kombetarja");

                    b.Navigation("Kompeticioni");

                    b.Navigation("Stadiumi");

                    b.Navigation("Statusi");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Selektori", b =>
                {
                    b.HasOne("FederataFutbollit.Entities.Kombetarja", "Kombetarja")
                        .WithOne("Selektori")
                        .HasForeignKey("FederataFutbollit.Entities.Selektori", "KombetarjaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kombetarja");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Stadiumi", b =>
                {
                    b.HasOne("FederataFutbollit.Entities.Kombetarja", "Kombetarja")
                        .WithMany("Stadiumet")
                        .HasForeignKey("KombetarjaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kombetarja");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Stafi", b =>
                {
                    b.HasOne("FederataFutbollit.Entities.Kombetarja", "Kombetarja")
                        .WithMany("Stafi")
                        .HasForeignKey("KombetarjaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FederataFutbollit.Entities.Roli", "Roli")
                        .WithMany("Stafi")
                        .HasForeignKey("RoliID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kombetarja");

                    b.Navigation("Roli");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("FederataFutbollit.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("FederataFutbollit.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FederataFutbollit.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("FederataFutbollit.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Kombetarja", b =>
                {
                    b.Navigation("Lojtaret");

                    b.Navigation("Ndeshjet");

                    b.Navigation("Selektori")
                        .IsRequired();

                    b.Navigation("Stadiumet");

                    b.Navigation("Stafi");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Kompeticionet", b =>
                {
                    b.Navigation("Ndeshja");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Roli", b =>
                {
                    b.Navigation("Stafi");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Shteti", b =>
                {
                    b.Navigation("Kombetarja")
                        .IsRequired();
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Stadiumi", b =>
                {
                    b.Navigation("Ndeshjet");
                });

            modelBuilder.Entity("FederataFutbollit.Entities.Statusi", b =>
                {
                    b.Navigation("Ndeshjet");
                });
#pragma warning restore 612, 618
        }
    }
}
