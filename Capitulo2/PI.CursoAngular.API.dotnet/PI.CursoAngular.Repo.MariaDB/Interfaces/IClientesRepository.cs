using PI.CursoAngular.Repo.MariaDB.DBModelClientes;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PI.CursoAngular.Repo.MariaDB.Interfaces
{
    public interface IClientesRepository
    {
        Task<IEnumerable<Clientes>> ObtenerClientes();
        Task<Clientes> ObtenerClientePorIdAsync(int id);
        Task AgregarClienteAsync(Clientes cli);
        void EliminarCliente(Clientes cli);

    }
}
