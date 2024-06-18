using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class AddGolaColumnsToNdeshjaSuperliges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GolaEkipa1",
                table: "NdeshjaSuperliges",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GolaEkipa2",
                table: "NdeshjaSuperliges",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GolaEkipa1",
                table: "NdeshjaSuperliges");

            migrationBuilder.DropColumn(
                name: "GolaEkipa2",
                table: "NdeshjaSuperliges");
        }
    }
}
