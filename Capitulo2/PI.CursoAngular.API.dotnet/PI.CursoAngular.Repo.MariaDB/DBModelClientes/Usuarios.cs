using System;
using System.Collections.Generic;

namespace PI.CursoAngular.Repo.MariaDB.DBModelClientes
{
    public partial class Usuarios
    {
        public int Id { get; set; }
        public string Usuario { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Password { get; set; }
    }
}
