using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class StafiKombetarja : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pozita",
                table: "Stafi");

            migrationBuilder.AddColumn<int>(
                name: "KombetarjaID",
                table: "Stafi",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Stafi_KombetarjaID",
                table: "Stafi",
                column: "KombetarjaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Stafi_Kombetarja_KombetarjaID",
                table: "Stafi",
                column: "KombetarjaID",
                principalTable: "Kombetarja",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stafi_Kombetarja_KombetarjaID",
                table: "Stafi");

            migrationBuilder.DropIndex(
                name: "IX_Stafi_KombetarjaID",
                table: "Stafi");

            migrationBuilder.DropColumn(
                name: "KombetarjaID",
                table: "Stafi");

            migrationBuilder.AddColumn<string>(
                name: "Pozita",
                table: "Stafi",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
