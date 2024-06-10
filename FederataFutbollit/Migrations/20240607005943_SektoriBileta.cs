using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class SektoriBileta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SektoriUlseveID",
                table: "Biletat",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Biletat_SektoriUlseveID",
                table: "Biletat",
                column: "SektoriUlseveID");

            migrationBuilder.AddForeignKey(
                name: "FK_Biletat_SektoriUlseve_SektoriUlseveID",
                table: "Biletat",
                column: "SektoriUlseveID",
                principalTable: "SektoriUlseve",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Biletat_SektoriUlseve_SektoriUlseveID",
                table: "Biletat");

            migrationBuilder.DropIndex(
                name: "IX_Biletat_SektoriUlseveID",
                table: "Biletat");

            migrationBuilder.DropColumn(
                name: "SektoriUlseveID",
                table: "Biletat");
        }
    }
}
