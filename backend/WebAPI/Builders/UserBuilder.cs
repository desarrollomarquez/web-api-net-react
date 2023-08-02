using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Models;

namespace WebAPI.Configurations
{
    public class UserBuilder : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable(nameof(User));

            builder.HasKey(k => k.Id);

            builder.Property(p => p.Id)
                .ValueGeneratedOnAdd();

            builder.Property(p => p.FullName)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(p => p.FullLastName)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(p => p.NameUser)
               .HasMaxLength(100)
               .IsRequired();

            builder.Property(p => p.Email)
              .HasMaxLength(100)
              .IsRequired();

            builder.Property(p => p.Password)
                .IsRequired();

        }
    }
}
