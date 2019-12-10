using PI.CursoAngular.Repo.MariaDB.DBModelClientes;
using PI.CursoAngular.Repo.MariaDB.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PI.CursoAngular.Repo.MariaDB
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly curso_angularContext context;

        public UnitOfWork(curso_angularContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
