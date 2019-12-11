using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PI.CursoAngular.Repo.MariaDB.DBModelClientes
{
    public partial class curso_angularContext : DbContext
    {
        //public curso_angularContext()
        //{
        //}

        public curso_angularContext(DbContextOptions<curso_angularContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CliDirecciones> CliDirecciones { get; set; }
        public virtual DbSet<CliTelefonos> CliTelefonos { get; set; }
        public virtual DbSet<Clientes> Clientes { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;database=curso_angular;user=UUUUUUU;password=AAAAAAAAAA", x => x.ServerVersion("10.4.6-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CliDirecciones>(entity =>
            {
                entity.ToTable("cli_direcciones");

                entity.HasComment("Contiene las direcciones de los clientes.");

                entity.HasIndex(e => e.Idcliente)
                    .HasName("clidirecciones_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)")
                    .HasComment("Contiene las direcciones de los clientes.");

                entity.Property(e => e.Direccion)
                    .IsRequired()
                    .HasColumnName("direccion")
                    .HasColumnType("varchar(100)")
                    .HasComment("Dirección del clinte.")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Idcliente)
                    .HasColumnName("idcliente")
                    .HasColumnType("int(11)")
                    .HasComment("Identificador único del cliente.");

                entity.HasOne(d => d.IdclienteNavigation)
                    .WithMany(p => p.CliDirecciones)
                    .HasForeignKey(d => d.Idcliente)
                    //https://docs.microsoft.com/en-us/ef/core/saving/cascade-delete#delete-behaviors
                    //.OnDelete(DeleteBehavior.ClientSetNull)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("clidirecciones_fk");
            });

            modelBuilder.Entity<CliTelefonos>(entity =>
            {
                entity.ToTable("cli_telefonos");

                entity.HasComment("Contiene los teléfonos de los clientes.");

                entity.HasIndex(e => e.Idcliente)
                    .HasName("clitelefonos_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)")
                    .HasComment("Contiene las direcciones de los clientes.");

                entity.Property(e => e.Idcliente)
                    .HasColumnName("idcliente")
                    .HasColumnType("int(11)")
                    .HasComment("Identificador único del cliente.");

                entity.Property(e => e.Telefono)
                    .IsRequired()
                    .HasColumnName("telefono")
                    .HasColumnType("varchar(16)")
                    .HasComment("Teléfono del clinte.")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.HasOne(d => d.IdclienteNavigation)
                    .WithMany(p => p.CliTelefonos)
                    .HasForeignKey(d => d.Idcliente)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("clitelefonos_fk");
            });

            modelBuilder.Entity<Clientes>(entity =>
            {
                entity.ToTable("clientes");

                entity.HasComment("Contiene la informacion de los clientes.");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)")
                    .HasComment("Identificador único del cliente.");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasColumnName("apellido")
                    .HasColumnType("varchar(100)")
                    .HasComment("Apellido del cliente.")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Fechadenacimiento)
                    .HasColumnName("fechadenacimiento")
                    .HasColumnType("datetime")
                    .HasComment("Fecha de nacimiento del cliente.");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(100)")
                    .HasComment("Nombre del cliente.")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.ToTable("usuarios");

                entity.HasComment("Contiene los datos de los usuarios del sistema.");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)")
                    .HasComment("Identificador del usuario.");

                entity.Property(e => e.Apellidos)
                    .IsRequired()
                    .HasColumnName("apellidos")
                    .HasColumnType("varchar(100)")
                    .HasComment("Apellidos del usuario.")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Nombres)
                    .IsRequired()
                    .HasColumnName("nombres")
                    .HasColumnType("varchar(100)")
                    .HasComment("Nombre del usuario.")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasColumnType("varchar(1024)")
                    .HasDefaultValueSql("'NULL'")
                    .HasComment("Contraseña")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Usuario)
                    .IsRequired()
                    .HasColumnName("usuario")
                    .HasColumnType("varchar(100)")
                    .HasComment("Identificador alfanumérico del usuario.")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
