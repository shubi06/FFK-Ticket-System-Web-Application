using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class AddReferiToNdeshjaSuperliges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReferiId",
                table: "NdeshjaSuperliges",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_NdeshjaSuperliges_ReferiId",
                table: "NdeshjaSuperliges",
                column: "ReferiId");

            migrationBuilder.AddForeignKey(
                name: "FK_NdeshjaSuperliges_Referi_ReferiId",
                table: "NdeshjaSuperliges",
                column: "ReferiId",
                principalTable: "Referi",
                principalColumn: "Referi_ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NdeshjaSuperliges_Referi_ReferiId",
                table: "NdeshjaSuperliges");

            migrationBuilder.DropIndex(
                name: "IX_NdeshjaSuperliges_ReferiId",
                table: "NdeshjaSuperliges");

            migrationBuilder.DropColumn(
                name: "ReferiId",
                table: "NdeshjaSuperliges");
        }
    }
}
