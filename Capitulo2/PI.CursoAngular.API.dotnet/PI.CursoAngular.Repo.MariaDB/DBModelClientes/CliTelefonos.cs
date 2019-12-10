using System;
using System.Collections.Generic;

namespace PI.CursoAngular.Repo.MariaDB.DBModelClientes
{
    public partial class CliTelefonos
    {
        public int Id { get; set; }
        public int Idcliente { get; set; }
        public string Telefono { get; set; }

        public virtual Clientes IdclienteNavigation { get; set; }
    }
}
