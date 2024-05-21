using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class RoliStafi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoliID",
                table: "Stafi",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Roli",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roli", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stafi_RoliID",
                table: "Stafi",
                column: "RoliID");

            migrationBuilder.AddForeignKey(
                name: "FK_Stafi_Roli_RoliID",
                table: "Stafi",
                column: "RoliID",
                principalTable: "Roli",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stafi_Roli_RoliID",
                table: "Stafi");

            migrationBuilder.DropTable(
                name: "Roli");

            migrationBuilder.DropIndex(
                name: "IX_Stafi_RoliID",
                table: "Stafi");

            migrationBuilder.DropColumn(
                name: "RoliID",
                table: "Stafi");
        }
    }
}
