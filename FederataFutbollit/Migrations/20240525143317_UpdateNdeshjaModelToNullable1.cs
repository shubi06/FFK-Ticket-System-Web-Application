using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNdeshjaModelToNullable1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NdeshjaId",
                table: "Ndeshja",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ndeshja_NdeshjaId",
                table: "Ndeshja",
                column: "NdeshjaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ndeshja_Ndeshja_NdeshjaId",
                table: "Ndeshja",
                column: "NdeshjaId",
                principalTable: "Ndeshja",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ndeshja_Ndeshja_NdeshjaId",
                table: "Ndeshja");

            migrationBuilder.DropIndex(
                name: "IX_Ndeshja_NdeshjaId",
                table: "Ndeshja");

            migrationBuilder.DropColumn(
                name: "NdeshjaId",
                table: "Ndeshja");
        }
    }
}
