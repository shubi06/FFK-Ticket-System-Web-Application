using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class Referi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Referi",
                columns: table => new
                {
                    Referi_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kombesia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mosha = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Referi", x => x.Referi_ID);
                });

            migrationBuilder.CreateTable(
                name: "Rezultati",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriKlubit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kundershtari = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataNdeshjes = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GolatEkipi1 = table.Column<int>(type: "int", nullable: false),
                    GolatEkipi2 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezultati", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Referi");

            migrationBuilder.DropTable(
                name: "Rezultati");
        }
    }
}
