using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class Lojtaret : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lojtaret",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mosha = table.Column<int>(type: "int", nullable: false),
                    Pozicioni = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gola = table.Column<int>(type: "int", nullable: false),
                    Asiste = table.Column<int>(type: "int", nullable: false),
                    NrFaneles = table.Column<int>(type: "int", nullable: false),
                    KombetarjaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lojtaret", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lojtaret_Kombetarja_KombetarjaID",
                        column: x => x.KombetarjaID,
                        principalTable: "Kombetarja",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lojtaret_KombetarjaID",
                table: "Lojtaret",
                column: "KombetarjaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lojtaret");
        }
    }
}
