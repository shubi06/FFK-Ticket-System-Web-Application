using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class Bileta2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Uleset_Stadiumi_StadiumiId",
                table: "Uleset");

            migrationBuilder.DropIndex(
                name: "IX_Uleset_StadiumiId",
                table: "Uleset");

            migrationBuilder.DropColumn(
                name: "StadiumiId",
                table: "Uleset");

            migrationBuilder.AddColumn<int>(
                name: "SektoriUlseveID",
                table: "Uleset",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Uleset_SektoriUlseveID",
                table: "Uleset",
                column: "SektoriUlseveID");

            migrationBuilder.AddForeignKey(
                name: "FK_Uleset_SektoriUlseve_SektoriUlseveID",
                table: "Uleset",
                column: "SektoriUlseveID",
                principalTable: "SektoriUlseve",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Uleset_SektoriUlseve_SektoriUlseveID",
                table: "Uleset");

            migrationBuilder.DropIndex(
                name: "IX_Uleset_SektoriUlseveID",
                table: "Uleset");

            migrationBuilder.DropColumn(
                name: "SektoriUlseveID",
                table: "Uleset");

            migrationBuilder.AddColumn<int>(
                name: "StadiumiId",
                table: "Uleset",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Uleset_StadiumiId",
                table: "Uleset",
                column: "StadiumiId");

            migrationBuilder.AddForeignKey(
                name: "FK_Uleset_Stadiumi_StadiumiId",
                table: "Uleset",
                column: "StadiumiId",
                principalTable: "Stadiumi",
                principalColumn: "Id");
        }
    }
}
