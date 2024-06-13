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
            migrationBuilder.DropForeignKey(
                name: "FK_NdeshjetESuperliges_Ekipa_EkipaId",
                table: "NdeshjetESuperliges");

            migrationBuilder.DropForeignKey(
                name: "FK_NdeshjetESuperliges_Statusi_StatusiId",
                table: "NdeshjetESuperliges");

            migrationBuilder.DropForeignKey(
                name: "FK_NdeshjetESuperliges_Superligat_SuperligaId",
                table: "NdeshjetESuperliges");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NdeshjetESuperliges",
                table: "NdeshjetESuperliges");

            migrationBuilder.RenameTable(
                name: "NdeshjetESuperliges",
                newName: "NdeshjaSuperliges");

            migrationBuilder.RenameIndex(
                name: "IX_NdeshjetESuperliges_SuperligaId",
                table: "NdeshjaSuperliges",
                newName: "IX_NdeshjaSuperliges_SuperligaId");

            migrationBuilder.RenameIndex(
                name: "IX_NdeshjetESuperliges_StatusiId",
                table: "NdeshjaSuperliges",
                newName: "IX_NdeshjaSuperliges_StatusiId");

            migrationBuilder.RenameIndex(
                name: "IX_NdeshjetESuperliges_EkipaId",
                table: "NdeshjaSuperliges",
                newName: "IX_NdeshjaSuperliges_EkipaId");

            migrationBuilder.AddColumn<string>(
                name: "SeatFirstName",
                table: "CartSeats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SeatLastName",
                table: "CartSeats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NdeshjaSuperliges",
                table: "NdeshjaSuperliges",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_NdeshjaSuperliges_Ekipa_EkipaId",
                table: "NdeshjaSuperliges",
                column: "EkipaId",
                principalTable: "Ekipa",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NdeshjaSuperliges_Statusi_StatusiId",
                table: "NdeshjaSuperliges",
                column: "StatusiId",
                principalTable: "Statusi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NdeshjaSuperliges_Superligat_SuperligaId",
                table: "NdeshjaSuperliges",
                column: "SuperligaId",
                principalTable: "Superligat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NdeshjaSuperliges_Ekipa_EkipaId",
                table: "NdeshjaSuperliges");

            migrationBuilder.DropForeignKey(
                name: "FK_NdeshjaSuperliges_Statusi_StatusiId",
                table: "NdeshjaSuperliges");

            migrationBuilder.DropForeignKey(
                name: "FK_NdeshjaSuperliges_Superligat_SuperligaId",
                table: "NdeshjaSuperliges");

            migrationBuilder.DropTable(
                name: "Referi");

            migrationBuilder.DropTable(
                name: "Rezultati");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NdeshjaSuperliges",
                table: "NdeshjaSuperliges");

            migrationBuilder.DropColumn(
                name: "SeatFirstName",
                table: "CartSeats");

            migrationBuilder.DropColumn(
                name: "SeatLastName",
                table: "CartSeats");

            migrationBuilder.RenameTable(
                name: "NdeshjaSuperliges",
                newName: "NdeshjetESuperliges");

            migrationBuilder.RenameIndex(
                name: "IX_NdeshjaSuperliges_SuperligaId",
                table: "NdeshjetESuperliges",
                newName: "IX_NdeshjetESuperliges_SuperligaId");

            migrationBuilder.RenameIndex(
                name: "IX_NdeshjaSuperliges_StatusiId",
                table: "NdeshjetESuperliges",
                newName: "IX_NdeshjetESuperliges_StatusiId");

            migrationBuilder.RenameIndex(
                name: "IX_NdeshjaSuperliges_EkipaId",
                table: "NdeshjetESuperliges",
                newName: "IX_NdeshjetESuperliges_EkipaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NdeshjetESuperliges",
                table: "NdeshjetESuperliges",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NdeshjetESuperliges_Ekipa_EkipaId",
                table: "NdeshjetESuperliges",
                column: "EkipaId",
                principalTable: "Ekipa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NdeshjetESuperliges_Statusi_StatusiId",
                table: "NdeshjetESuperliges",
                column: "StatusiId",
                principalTable: "Statusi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NdeshjetESuperliges_Superligat_SuperligaId",
                table: "NdeshjetESuperliges",
                column: "SuperligaId",
                principalTable: "Superligat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
