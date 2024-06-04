using Microsoft.EntityFrameworkCore.Migrations;

namespace FederataFutbollit.Migrations
{
    public partial class AddBuyerDetailsToOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    OrderDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(nullable: false),
                    LastName = table.Column<string>(nullable: false),
                    City = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "CartSeats",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CartSeats_OrderId",
                table: "CartSeats",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartSeats_Orders_OrderId",
                table: "CartSeats",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartSeats_Orders_OrderId",
                table: "CartSeats");

            migrationBuilder.DropIndex(
                name: "IX_CartSeats_OrderId",
                table: "CartSeats");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "CartSeats");

            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
