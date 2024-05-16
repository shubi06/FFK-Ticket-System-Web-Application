using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class KombetarjaSelektori : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KombetarjaID",
                table: "Selektort",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Nacionaliteti",
                table: "Selektort",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "VitetEKontrates",
                table: "Selektort",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Selektort_KombetarjaID",
                table: "Selektort",
                column: "KombetarjaID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Selektort_Kombetarja_KombetarjaID",
                table: "Selektort",
                column: "KombetarjaID",
                principalTable: "Kombetarja",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Selektort_Kombetarja_KombetarjaID",
                table: "Selektort");

            migrationBuilder.DropIndex(
                name: "IX_Selektort_KombetarjaID",
                table: "Selektort");

            migrationBuilder.DropColumn(
                name: "KombetarjaID",
                table: "Selektort");

            migrationBuilder.DropColumn(
                name: "Nacionaliteti",
                table: "Selektort");

            migrationBuilder.DropColumn(
                name: "VitetEKontrates",
                table: "Selektort");
        }
    }
}
