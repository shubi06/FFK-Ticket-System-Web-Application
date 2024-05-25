using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class StadiumiNdeshjaKompeticionetStatusi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kompeticionet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kompeticionet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stadiumi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kapaciteti = table.Column<int>(type: "int", nullable: false),
                    VitiNdertuar = table.Column<int>(type: "int", nullable: false),
                    KombetarjaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stadiumi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stadiumi_Kombetarja_KombetarjaID",
                        column: x => x.KombetarjaID,
                        principalTable: "Kombetarja",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Statusi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statusi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ndeshja",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StadiumiId = table.Column<int>(type: "int", nullable: false),
                    KompeticioniId = table.Column<int>(type: "int", nullable: false),
                    StatusiId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ndeshja", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ndeshja_Kompeticionet_KompeticioniId",
                        column: x => x.KompeticioniId,
                        principalTable: "Kompeticionet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ndeshja_Stadiumi_StadiumiId",
                        column: x => x.StadiumiId,
                        principalTable: "Stadiumi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ndeshja_Statusi_StatusiId",
                        column: x => x.StatusiId,
                        principalTable: "Statusi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ndeshja_KompeticioniId",
                table: "Ndeshja",
                column: "KompeticioniId");

            migrationBuilder.CreateIndex(
                name: "IX_Ndeshja_StadiumiId",
                table: "Ndeshja",
                column: "StadiumiId");

            migrationBuilder.CreateIndex(
                name: "IX_Ndeshja_StatusiId",
                table: "Ndeshja",
                column: "StatusiId");

            migrationBuilder.CreateIndex(
                name: "IX_Stadiumi_KombetarjaID",
                table: "Stadiumi",
                column: "KombetarjaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ndeshja");

            migrationBuilder.DropTable(
                name: "Kompeticionet");

            migrationBuilder.DropTable(
                name: "Stadiumi");

            migrationBuilder.DropTable(
                name: "Statusi");
        }
    }
}
