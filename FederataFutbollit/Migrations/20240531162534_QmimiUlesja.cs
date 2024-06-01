using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class QmimiUlesja : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          
            migrationBuilder.AddColumn<double>(
                name: "Cmimi",
                table: "Uleset",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

           
          
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.DropColumn(
                name: "Cmimi",
                table: "Uleset");

        }
    }
}
