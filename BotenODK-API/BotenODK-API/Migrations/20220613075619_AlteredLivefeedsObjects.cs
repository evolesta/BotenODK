using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BotenODK_API.Migrations
{
    public partial class AlteredLivefeedsObjects : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ObjectDetection");

            migrationBuilder.RenameColumn(
                name: "MaxDuration",
                table: "Livefeed",
                newName: "URL");

            migrationBuilder.RenameColumn(
                name: "Filepath",
                table: "Livefeed",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "URL",
                table: "Livefeed",
                newName: "MaxDuration");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Livefeed",
                newName: "Filepath");

            migrationBuilder.CreateTable(
                name: "ObjectDetection",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LivefeedId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SensityMovement = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjectDetection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ObjectDetection_Livefeed_LivefeedId",
                        column: x => x.LivefeedId,
                        principalTable: "Livefeed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ObjectDetection_LivefeedId",
                table: "ObjectDetection",
                column: "LivefeedId");
        }
    }
}
