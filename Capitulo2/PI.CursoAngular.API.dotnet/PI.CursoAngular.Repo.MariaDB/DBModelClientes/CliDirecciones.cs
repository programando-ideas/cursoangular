using System;
using System.Collections.Generic;

namespace PI.CursoAngular.Repo.MariaDB.DBModelClientes
{
    public partial class CliDirecciones
    {
        public int Id { get; set; }
        public int Idcliente { get; set; }
        public string Direccion { get; set; }

        public virtual Clientes IdclienteNavigation { get; set; }
    }
}
