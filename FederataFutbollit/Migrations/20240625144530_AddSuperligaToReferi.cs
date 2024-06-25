using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class AddSuperligaToReferi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          
            migrationBuilder.AddColumn<int>(
                name: "SuperligaId",
                table: "Referi",
                type: "int",
                nullable: false,
                defaultValue: 0);


            migrationBuilder.CreateIndex(
                name: "IX_Referi_SuperligaId",
                table: "Referi",
                column: "SuperligaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Referi_Superliga_SuperligaId",
                table: "Referi",
                column: "SuperligaId",
                principalTable: "Superligat",
                principalColumn: "Id");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
          
            migrationBuilder.DropForeignKey(
                name: "FK_Referi_Superligat_SuperligaId",
                table: "Referi");

        
            migrationBuilder.DropIndex(
                name: "IX_Referi_SuperligaId",
                table: "Referi");

            migrationBuilder.DropColumn(
                name: "SuperligaId",
                table: "Referi");

        }
    }
}
