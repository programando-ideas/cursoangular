using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PI.CursoAngular.API.dotnet.Models;

namespace PI.CursoAngular.API.dotnet.Controllers
{
    [Route("api/clientes")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        [Route("lista")]
        public IActionResult Lista()
        {
            return Ok(new List<MCliente>() {
                new MCliente()
                {
                    Nombre = "Cliente 1",
                    Apellido = "Apellido 1",
                    Edad = CalcularEdad(new DateTime(1956, 3, 6)),
                    FechaDeNacimiento = (new DateTime(1956, 3, 6)).ToString("dd/MM/yyyy")
                },
                new MCliente()
                {
                    Nombre = "Cliente 2",
                    Apellido = "Apellido 2",
                    Edad = CalcularEdad(new DateTime(1988, 12, 25)),
                    FechaDeNacimiento = (new DateTime(1988, 12, 25)).ToString("dd/MM/yyyy")
                },
                new MCliente()
                {
                    Nombre = "Cliente 3",
                    Apellido = "Apellido 3",
                    Edad = CalcularEdad(new DateTime(1980, 6, 6)),
                    FechaDeNacimiento = (new DateTime(1980, 6, 6)).ToString("dd/MM/yyyy")
                },
            });
        }

        private int CalcularEdad(DateTime Fecha)
        {
            int edad = DateTime.Today.AddTicks(-Fecha.Ticks).Year - 1;
            return edad;
        }
    }
}