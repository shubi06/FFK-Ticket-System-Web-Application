using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    public partial class Shporta : Migration
    {
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
                name: "Carts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Carts_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CartSeats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CartId = table.Column<int>(type: "int", nullable: false),
                    UlesjaId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    SektoriUlseveId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartSeats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartSeats_Carts_CartId",
                        column: x => x.CartId,
                        principalTable: "Carts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartSeats_SektoriUlseve_SektoriUlseveId",
                        column: x => x.SektoriUlseveId,
                        principalTable: "SektoriUlseve",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartSeats_Uleset_UlesjaId",
                        column: x => x.UlesjaId,
                        principalTable: "Uleset",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction); // Changed to NO ACTION
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carts_ApplicationUserId",
                table: "Carts",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CartSeats_CartId",
                table: "CartSeats",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_CartSeats_SektoriUlseveId",
                table: "CartSeats",
                column: "SektoriUlseveId");

            migrationBuilder.CreateIndex(
                name: "IX_CartSeats_UlesjaId",
                table: "CartSeats",
                column: "UlesjaId");

            migrationBuilder.AddForeignKey(
                name: "FK_LojtaretSuperlige_Superligat_SuperligaId",
                table: "LojtaretSuperlige",
                column: "SuperligaId",
                principalTable: "Superligat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LojtaretSuperlige_Superligat_SuperligaId",
                table: "LojtaretSuperlige");

            migrationBuilder.DropTable(
                name: "CartSeats");

            migrationBuilder.DropTable(
                name: "Carts");

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
