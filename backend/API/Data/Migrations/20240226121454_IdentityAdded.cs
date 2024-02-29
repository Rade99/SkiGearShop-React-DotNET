using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class IdentityAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "295a95da-f2c3-44ba-8e67-87d36f062643");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ee168c8b-b4aa-4928-85b1-02fe2b34ea2d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4d742748-ea34-482f-8f31-620796d9dc9b", null, "Admin", "ADMIN" },
                    { "75ef718d-a680-4545-a0bd-4e6058fa3dfe", null, "Member", "MEMBER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d742748-ea34-482f-8f31-620796d9dc9b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "75ef718d-a680-4545-a0bd-4e6058fa3dfe");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "295a95da-f2c3-44ba-8e67-87d36f062643", null, "Member", "MEMBER" },
                    { "ee168c8b-b4aa-4928-85b1-02fe2b34ea2d", null, "Admin", "ADMIN" }
                });
        }
    }
}
