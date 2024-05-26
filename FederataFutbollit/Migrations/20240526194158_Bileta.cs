using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class Bileta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SektoriUlseve",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SektoriUlseve", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Uleset",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numri = table.Column<int>(type: "int", nullable: false),
                    IsAvailable = table.Column<bool>(type: "bit", nullable: false),
                    StadiumiId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Uleset", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Uleset_Stadiumi_StadiumiId",
                        column: x => x.StadiumiId,
                        principalTable: "Stadiumi",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Biletat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cmimi = table.Column<int>(type: "int", nullable: false),
                    OraBlerjes = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UlesjaID = table.Column<int>(type: "int", nullable: false),
                    NdeshjaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Biletat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Biletat_Ndeshja_NdeshjaID",
                        column: x => x.NdeshjaID,
                        principalTable: "Ndeshja",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Biletat_Uleset_UlesjaID",
                        column: x => x.UlesjaID,
                        principalTable: "Uleset",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Biletat_NdeshjaID",
                table: "Biletat",
                column: "NdeshjaID");

            migrationBuilder.CreateIndex(
                name: "IX_Biletat_UlesjaID",
                table: "Biletat",
                column: "UlesjaID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Uleset_StadiumiId",
                table: "Uleset",
                column: "StadiumiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Biletat");

            migrationBuilder.DropTable(
                name: "SektoriUlseve");

            migrationBuilder.DropTable(
                name: "Uleset");
        }
    }
}
