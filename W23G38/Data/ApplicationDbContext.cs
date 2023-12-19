using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using W23G38.Models;


namespace W23G38.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product>? Products { get; set; }
        public DbSet<UserModel>? User { get; set; }

        public DbSet<Contact>? Contacts { get; set; }

        public DbSet<Category>? Categories { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>()
          .HasOne(p => p.Category)
          .WithMany(c => c.Products)
          .HasForeignKey(p => p.CategoryId);

            builder.Entity<Category>()
               .Property(c => c.Id)
               .ValueGeneratedOnAdd();

            base.OnModelCreating(builder);

            builder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Price)
                    .HasColumnType("decimal(18, 2)");
                                                      
            });
        }

        public DbSet<W23G38.Models.UserModel>? UserModel { get; set; }

    }

}
