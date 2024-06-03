using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class AddAccountingAndExpenses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Shpenzimet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Shuma = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shpenzimet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kontabiliteti",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StafiId = table.Column<int>(type: "int", nullable: false),
                    ShpenzimetId = table.Column<int>(type: "int", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShumaTotale = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kontabiliteti", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kontabiliteti_Shpenzimet_ShpenzimetId",
                        column: x => x.ShpenzimetId,
                        principalTable: "Shpenzimet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Kontabiliteti_Stafi_StafiId",
                        column: x => x.StafiId,
                        principalTable: "Stafi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kontabiliteti_ShpenzimetId",
                table: "Kontabiliteti",
                column: "ShpenzimetId");

            migrationBuilder.CreateIndex(
                name: "IX_Kontabiliteti_StafiId",
                table: "Kontabiliteti",
                column: "StafiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kontabiliteti");

            migrationBuilder.DropTable(
                name: "Shpenzimet");
        }
    }
}
