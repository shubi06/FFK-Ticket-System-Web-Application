using Microsoft.EntityFrameworkCore.Migrations;

namespace FederataFutbollit.Migrations
{
    public partial class AddReferi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Referi",
                columns: table => new
                {
                    Referi_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kombesia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mosha = table.Column<string>(type: "nvarchar(max)", nullable: false)
                    // Add other necessary fields here
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Referi", x => x.Referi_ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Referi");
        }
    }
}
