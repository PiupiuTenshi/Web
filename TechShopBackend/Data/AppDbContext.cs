using Microsoft.EntityFrameworkCore;
using TechShopAPI.Models;

namespace TechShopAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; } 
    }
}