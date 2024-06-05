using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FederataFutbollit.Migrations
{
    /// <inheritdoc />
    public partial class AddUlesjaStadiumiRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Step 1: Add the StadiumiId column
            migrationBuilder.AddColumn<int>(
                name: "StadiumiId",
                table: "Uleset",
                type: "int",
                nullable: false,
                defaultValue: 0);

            // Step 2: Update existing records to have valid StadiumiId values
            migrationBuilder.Sql(@"
                UPDATE Uleset
                SET StadiumiId = (SELECT TOP 1 Id FROM Stadiumi)
                WHERE StadiumiId NOT IN (SELECT Id FROM Stadiumi);
            ");

            // Step 3: Create index on StadiumiId
            migrationBuilder.CreateIndex(
                name: "IX_Uleset_StadiumiId",
                table: "Uleset",
                column: "StadiumiId");

            // Step 4: Add the foreign key constraint
            migrationBuilder.AddForeignKey(
                name: "FK_Uleset_Stadiumi_StadiumiId",
                table: "Uleset",
                column: "StadiumiId",
                principalTable: "Stadiumi",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction,
                onUpdate: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
