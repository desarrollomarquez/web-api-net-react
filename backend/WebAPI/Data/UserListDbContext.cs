using Microsoft.EntityFrameworkCore;
using WebAPI.Configurations;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class UserListDbContext : DbContext
    {
        public UserListDbContext(DbContextOptions<UserListDbContext> options)
            : base(options) { }


        public DbSet<User> User { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfiguration(new UserBuilder());
  
        }
    }
}
