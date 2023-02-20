using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BotenODK_API.Migrations
{
    public partial class SeedFirstUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "AuthToken", "Email", "FirstName", "LastName", "Password", "Role", "Username", "checksum" },
                values: new object[] { 1, null, "info@veela.nl", "Test", "Gebruiker", "$2a$11$q55mQedtLMd36pck1tq0ruXyJTFPIgtEzMPUVv2Qm.h/mFjCpMo4.", "Administrator", "test", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
