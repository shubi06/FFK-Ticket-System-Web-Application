using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class Ekipa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LojtaretSuperlige_Superligat_SuperligaID",
                table: "LojtaretSuperlige");

            migrationBuilder.RenameColumn(
                name: "SuperligaID",
                table: "LojtaretSuperlige",
                newName: "SuperligaId");

            migrationBuilder.RenameIndex(
                name: "IX_LojtaretSuperlige_SuperligaID",
                table: "LojtaretSuperlige",
                newName: "IX_LojtaretSuperlige_SuperligaId");

            migrationBuilder.CreateTable(
                name: "Ekipa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriKlubit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Trajneri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VitiThemelimit = table.Column<int>(type: "int", nullable: false),
                    NrTitujve = table.Column<int>(type: "int", nullable: false),
                    SuperligaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ekipa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ekipa_Superligat_SuperligaId",
                        column: x => x.SuperligaId,
                        principalTable: "Superligat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ekipa_SuperligaId",
                table: "Ekipa",
                column: "SuperligaId");

            migrationBuilder.AddForeignKey(
                name: "FK_LojtaretSuperlige_Superligat_SuperligaId",
                table: "LojtaretSuperlige",
                column: "SuperligaId",
                principalTable: "Superligat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LojtaretSuperlige_Superligat_SuperligaId",
                table: "LojtaretSuperlige");

            migrationBuilder.DropTable(
                name: "Ekipa");

            migrationBuilder.RenameColumn(
                name: "SuperligaId",
                table: "LojtaretSuperlige",
                newName: "SuperligaID");

            migrationBuilder.RenameIndex(
                name: "IX_LojtaretSuperlige_SuperligaId",
                table: "LojtaretSuperlige",
                newName: "IX_LojtaretSuperlige_SuperligaID");

            migrationBuilder.AddForeignKey(
                name: "FK_LojtaretSuperlige_Superligat_SuperligaID",
                table: "LojtaretSuperlige",
                column: "SuperligaID",
                principalTable: "Superligat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
