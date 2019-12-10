using System.Threading.Tasks;

namespace PI.CursoAngular.Repo.MariaDB.Interfaces
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}
