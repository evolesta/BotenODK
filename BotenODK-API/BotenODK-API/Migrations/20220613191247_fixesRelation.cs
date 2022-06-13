using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BotenODK_API.Migrations
{
    public partial class fixesRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetectedData_DataModel_COCOKey",
                table: "DetectedData");

            migrationBuilder.RenameColumn(
                name: "COCOKey",
                table: "DetectedData",
                newName: "DataModelId");

            migrationBuilder.RenameIndex(
                name: "IX_DetectedData_COCOKey",
                table: "DetectedData",
                newName: "IX_DetectedData_DataModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_DetectedData_DataModel_DataModelId",
                table: "DetectedData",
                column: "DataModelId",
                principalTable: "DataModel",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetectedData_DataModel_DataModelId",
                table: "DetectedData");

            migrationBuilder.RenameColumn(
                name: "DataModelId",
                table: "DetectedData",
                newName: "COCOKey");

            migrationBuilder.RenameIndex(
                name: "IX_DetectedData_DataModelId",
                table: "DetectedData",
                newName: "IX_DetectedData_COCOKey");

            migrationBuilder.AddForeignKey(
                name: "FK_DetectedData_DataModel_COCOKey",
                table: "DetectedData",
                column: "COCOKey",
                principalTable: "DataModel",
                principalColumn: "Id");
        }
    }
}
