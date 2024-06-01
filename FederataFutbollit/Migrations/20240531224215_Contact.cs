using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class Contact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

           
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LojtaretSuperlige_Superligat_SuperligaID",
                table: "LojtaretSuperlige");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.RenameColumn(
                name: "SuperligaID",
                table: "LojtaretSuperlige",
                newName: "SuperligaId");

            migrationBuilder.RenameIndex(
                name: "IX_LojtaretSuperlige_SuperligaID",
                table: "LojtaretSuperlige",
                newName: "IX_LojtaretSuperlige_SuperligaId");

            migrationBuilder.AddColumn<int>(
                name: "SuperligaID",
                table: "LojtaretSuperlige",
                type: "int",
                nullable: true);

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
