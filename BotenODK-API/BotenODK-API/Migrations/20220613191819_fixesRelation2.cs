using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BotenODK_API.Migrations
{
    public partial class fixesRelation2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "DataModel",
                newName: "DataModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataModelId",
                table: "DataModel",
                newName: "Id");
        }
    }
}
