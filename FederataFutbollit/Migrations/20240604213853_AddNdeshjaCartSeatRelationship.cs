using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class AddNdeshjaCartSeatRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NdeshjaId",
                table: "CartSeats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CartSeats_NdeshjaId",
                table: "CartSeats",
                column: "NdeshjaId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartSeats_Ndeshja_NdeshjaId",
                table: "CartSeats",
                column: "NdeshjaId",
                principalTable: "Ndeshja",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartSeats_Ndeshja_NdeshjaId",
                table: "CartSeats");

            migrationBuilder.DropIndex(
                name: "IX_CartSeats_NdeshjaId",
                table: "CartSeats");

            migrationBuilder.DropColumn(
                name: "NdeshjaId",
                table: "CartSeats");
        }
    }
}
