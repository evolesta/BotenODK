using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BotenODK_API.Migrations
{
    public partial class AlerdChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetectedData_DataModel_DataModelId",
                table: "DetectedData");

            migrationBuilder.DropIndex(
                name: "IX_DetectedData_DataModelId",
                table: "DetectedData");

            migrationBuilder.DropColumn(
                name: "DataModelId",
                table: "DetectedData");

            migrationBuilder.DropColumn(
                name: "State",
                table: "DetectedData");

            migrationBuilder.AddColumn<int>(
                name: "COCOKey",
                table: "DetectedData",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "DataModel",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Enabled",
                table: "DataModel",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_DetectedData_COCOKey",
                table: "DetectedData",
                column: "COCOKey");

            migrationBuilder.AddForeignKey(
                name: "FK_DetectedData_DataModel_COCOKey",
                table: "DetectedData",
                column: "COCOKey",
                principalTable: "DataModel",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetectedData_DataModel_COCOKey",
                table: "DetectedData");

            migrationBuilder.DropIndex(
                name: "IX_DetectedData_COCOKey",
                table: "DetectedData");

            migrationBuilder.DropColumn(
                name: "COCOKey",
                table: "DetectedData");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "DataModel");

            migrationBuilder.DropColumn(
                name: "Enabled",
                table: "DataModel");

            migrationBuilder.AddColumn<int>(
                name: "DataModelId",
                table: "DetectedData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "DetectedData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DetectedData_DataModelId",
                table: "DetectedData",
                column: "DataModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_DetectedData_DataModel_DataModelId",
                table: "DetectedData",
                column: "DataModelId",
                principalTable: "DataModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
