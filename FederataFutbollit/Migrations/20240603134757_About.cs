using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class About : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "AboutSections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AboutSections", x => x.Id);
                });

           
             
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LojtaretSuperlige_Superligat_SuperligaID",
                table: "LojtaretSuperlige");

            migrationBuilder.DropTable(
                name: "AboutSections");

            migrationBuilder.DropTable(
                name: "CartSeats");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropColumn(
                name: "Cmimi",
                table: "Uleset");

            migrationBuilder.DropColumn(
                name: "FotoPath",
                table: "LojtaretSuperlige");

            migrationBuilder.RenameColumn(
                name: "SuperligaID",
                table: "LojtaretSuperlige",
                newName: "SuperligaId");

            migrationBuilder.RenameIndex(
                name: "IX_LojtaretSuperlige_SuperligaID",
                table: "LojtaretSuperlige",
                newName: "IX_LojtaretSuperlige_SuperligaId");

            migrationBuilder.AddForeignKey(
                name: "FK_LojtaretSuperlige_Superligat_SuperligaId",
                table: "LojtaretSuperlige",
                column: "SuperligaId",
                principalTable: "Superligat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
