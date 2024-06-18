using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLojtaretSuperlige : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EkipaId",
                table: "LojtaretSuperlige",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EkipaId",
                table: "Lojtaret",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LojtaretSuperlige_EkipaId",
                table: "LojtaretSuperlige",
                column: "EkipaId");

            migrationBuilder.CreateIndex(
                name: "IX_Lojtaret_EkipaId",
                table: "Lojtaret",
                column: "EkipaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lojtaret_Ekipa_EkipaId",
                table: "Lojtaret",
                column: "EkipaId",
                principalTable: "Ekipa",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LojtaretSuperlige_Ekipa_EkipaId",
                table: "LojtaretSuperlige",
                column: "EkipaId",
                principalTable: "Ekipa",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lojtaret_Ekipa_EkipaId",
                table: "Lojtaret");

            migrationBuilder.DropForeignKey(
                name: "FK_LojtaretSuperlige_Ekipa_EkipaId",
                table: "LojtaretSuperlige");

            migrationBuilder.DropIndex(
                name: "IX_LojtaretSuperlige_EkipaId",
                table: "LojtaretSuperlige");

            migrationBuilder.DropIndex(
                name: "IX_Lojtaret_EkipaId",
                table: "Lojtaret");

            migrationBuilder.DropColumn(
                name: "EkipaId",
                table: "LojtaretSuperlige");

            migrationBuilder.DropColumn(
                name: "EkipaId",
                table: "Lojtaret");
        }
    }
}
