using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BotenODK_API.Migrations
{
    public partial class addFeedId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetectedData_DataModel_DataModelId",
                table: "DetectedData");

            migrationBuilder.DropIndex(
                name: "IX_DetectedData_DataModelId",
                table: "DetectedData");

            migrationBuilder.AddColumn<int>(
                name: "FeedId",
                table: "DetectedData",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FeedId",
                table: "DetectedData");

            migrationBuilder.CreateIndex(
                name: "IX_DetectedData_DataModelId",
                table: "DetectedData",
                column: "DataModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_DetectedData_DataModel_DataModelId",
                table: "DetectedData",
                column: "DataModelId",
                principalTable: "DataModel",
                principalColumn: "DataModelId");
        }
    }
}
