using Microsoft.EntityFrameworkCore.Migrations;

namespace FederataFutbollit.Migrations
{
    public partial class UpdateReferi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Kombesia",
                table: "Referi",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Mosha",
                table: "Referi",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Kombesia",
                table: "Referi");

            migrationBuilder.DropColumn(
                name: "Mosha",
                table: "Referi");
        }
    }
}
