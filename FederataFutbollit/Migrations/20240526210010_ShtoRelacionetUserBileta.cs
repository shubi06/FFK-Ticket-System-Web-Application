using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class ShtoRelacionetUserBileta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserID",
                table: "Biletat",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Biletat_ApplicationUserID",
                table: "Biletat",
                column: "ApplicationUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Biletat_AspNetUsers_ApplicationUserID",
                table: "Biletat",
                column: "ApplicationUserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Biletat_AspNetUsers_ApplicationUserID",
                table: "Biletat");

            migrationBuilder.DropIndex(
                name: "IX_Biletat_ApplicationUserID",
                table: "Biletat");

            migrationBuilder.DropColumn(
                name: "ApplicationUserID",
                table: "Biletat");
        }
    }
}
