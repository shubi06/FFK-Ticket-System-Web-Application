using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class AddCartSeatUlesjaRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CartSeats_UlesjaId",
                table: "CartSeats");

            migrationBuilder.CreateIndex(
                name: "IX_CartSeats_UlesjaId",
                table: "CartSeats",
                column: "UlesjaId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CartSeats_UlesjaId",
                table: "CartSeats");

            migrationBuilder.CreateIndex(
                name: "IX_CartSeats_UlesjaId",
                table: "CartSeats",
                column: "UlesjaId");
        }
    }
}
