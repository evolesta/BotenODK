using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BotenODK_API.Migrations
{
    public partial class AddedFieldtoUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Object_Livefeed_LivefeedId",
                table: "Object");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Object",
                table: "Object");

            migrationBuilder.RenameTable(
                name: "Object",
                newName: "ObjectDetection");

            migrationBuilder.RenameIndex(
                name: "IX_Object_LivefeedId",
                table: "ObjectDetection",
                newName: "IX_ObjectDetection_LivefeedId");

            migrationBuilder.AddColumn<string>(
                name: "AuthToken",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ObjectDetection",
                table: "ObjectDetection",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "DataModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    COCOKey = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DetectedData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<int>(type: "int", nullable: false),
                    DataModelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetectedData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetectedData_DataModel_DataModelId",
                        column: x => x.DataModelId,
                        principalTable: "DataModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetectedData_DataModelId",
                table: "DetectedData",
                column: "DataModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_ObjectDetection_Livefeed_LivefeedId",
                table: "ObjectDetection",
                column: "LivefeedId",
                principalTable: "Livefeed",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ObjectDetection_Livefeed_LivefeedId",
                table: "ObjectDetection");

            migrationBuilder.DropTable(
                name: "DetectedData");

            migrationBuilder.DropTable(
                name: "DataModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ObjectDetection",
                table: "ObjectDetection");

            migrationBuilder.DropColumn(
                name: "AuthToken",
                table: "User");

            migrationBuilder.RenameTable(
                name: "ObjectDetection",
                newName: "Object");

            migrationBuilder.RenameIndex(
                name: "IX_ObjectDetection_LivefeedId",
                table: "Object",
                newName: "IX_Object_LivefeedId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Object",
                table: "Object",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Object_Livefeed_LivefeedId",
                table: "Object",
                column: "LivefeedId",
                principalTable: "Livefeed",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
