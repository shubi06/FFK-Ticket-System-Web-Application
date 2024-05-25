using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNdeshjaWithKombetarja : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EkipiKundershtar",
                table: "Ndeshja",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "GolaEkipiJone",
                table: "Ndeshja",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GolaEkipiKundershtar",
                table: "Ndeshja",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KombetarjaId",
                table: "Ndeshja",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Ndeshja_KombetarjaId",
                table: "Ndeshja",
                column: "KombetarjaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ndeshja_Kombetarja_KombetarjaId",
                table: "Ndeshja",
                column: "KombetarjaId",
                principalTable: "Kombetarja",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ndeshja_Kombetarja_KombetarjaId",
                table: "Ndeshja");

            migrationBuilder.DropIndex(
                name: "IX_Ndeshja_KombetarjaId",
                table: "Ndeshja");

            migrationBuilder.DropColumn(
                name: "EkipiKundershtar",
                table: "Ndeshja");

            migrationBuilder.DropColumn(
                name: "GolaEkipiJone",
                table: "Ndeshja");

            migrationBuilder.DropColumn(
                name: "GolaEkipiKundershtar",
                table: "Ndeshja");

            migrationBuilder.DropColumn(
                name: "KombetarjaId",
                table: "Ndeshja");
        }
    }
}
