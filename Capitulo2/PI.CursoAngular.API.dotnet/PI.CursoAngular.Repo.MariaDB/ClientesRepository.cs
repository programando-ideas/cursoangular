using Microsoft.EntityFrameworkCore;
using PI.CursoAngular.Repo.MariaDB.DBModelClientes;
using PI.CursoAngular.Repo.MariaDB.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PI.CursoAngular.Repo.MariaDB
{
    public class ClientesRepository : IClientesRepository
    {
        private readonly curso_angularContext context;

        public ClientesRepository(curso_angularContext context)
        {
            this.context = context;
        }

        public async Task AgregarClienteAsync(Clientes cli)
        {
            await this.context.AddAsync(cli);
        }

        public void EliminarCliente(Clientes cli)
        {
            this.context.Remove(cli);
        }

        public async Task<Clientes> ObtenerClientePorIdAsync(int id)
        {
            return await this.context.Clientes
                .Include(cli => cli.CliDirecciones)
                .Include(cli => cli.CliTelefonos)
                .SingleOrDefaultAsync(cli => cli.Id == id);
        }

        public async Task<IEnumerable<Clientes>> ObtenerClientes()
        {
            return await this.context.Clientes
                .Include(cli => cli.CliDirecciones)
                .Include(cli => cli.CliTelefonos)
                .ToListAsync();
        }
    }
}
