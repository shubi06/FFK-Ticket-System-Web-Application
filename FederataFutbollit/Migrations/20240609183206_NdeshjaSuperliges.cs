﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    public partial class NdeshjaSuperliges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NdeshjaSuperliges",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ekipa1 = table.Column<string>(nullable: false),
                    Ekipa2 = table.Column<string>(nullable: false),
                    DataENdeshjes = table.Column<DateTime>(nullable: false),
                    StatusiId = table.Column<int>(nullable: false),
                    SuperligaId = table.Column<int>(nullable: false),
                    EkipaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NdeshjaSuperliges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NdeshjaSuperliges_Statusi_StatusiId",
                        column: x => x.StatusiId,
                        principalTable: "Statusi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NdeshjaSuperliges_Superligat_SuperligaId",
                        column: x => x.SuperligaId,
                        principalTable: "Superligat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NdeshjaSuperliges_Ekipa_EkipaId",
                        column: x => x.EkipaId,
                        principalTable: "Ekipa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NdeshjaSuperliges_StatusiId",
                table: "NdeshjaSuperliges",
                column: "StatusiId");

            migrationBuilder.CreateIndex(
                name: "IX_NdeshjaSuperliges_SuperligaId",
                table: "NdeshjaSuperliges",
                column: "SuperligaId");

            migrationBuilder.CreateIndex(
                name: "IX_NdeshjaSuperliges_EkipaId",
                table: "NdeshjaSuperliges",
                column: "EkipaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NdeshjaSuperliges");
        }
    }
}