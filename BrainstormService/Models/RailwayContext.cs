using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BrainstormService.Models;

public partial class RailwayContext : DbContext
{
    public RailwayContext() { }

    public RailwayContext(DbContextOptions<RailwayContext> options) : base(options) { }

    public virtual DbSet<Brainstorm> Brainstorms { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Word> Words { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(Environment.GetEnvironmentVariable("DATABASE_URL"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Brainstorm>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Brainstorm_pkey");

            entity.ToTable("Brainstorm");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp(3) without time zone")
                .HasColumnName("createdAt");
            entity.Property(e => e.MaxWords).HasColumnName("maxWords");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.User).WithMany(p => p.Brainstorms)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("Brainstorm_userId_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("User_pkey");

            entity.ToTable("User");

            entity.HasIndex(e => e.UserName, "User_userName_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp(3) without time zone")
                .HasColumnName("createdAt");
            entity.Property(e => e.PasswordHash).HasColumnName("passwordHash");
            entity.Property(e => e.UserName).HasColumnName("userName");
        });

        modelBuilder.Entity<Word>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Word_pkey");

            entity.ToTable("Word");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BrainstormId).HasColumnName("brainstormId");
            entity.Property(e => e.Color).HasColumnName("color");
            entity.Property(e => e.Occurrence)
                .HasDefaultValueSql("1")
                .HasColumnName("occurrence");
            entity.Property(e => e.Value).HasColumnName("value");

            entity.HasOne(d => d.Brainstorm).WithMany(p => p.Words)
                .HasForeignKey(d => d.BrainstormId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("Word_brainstormId_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
