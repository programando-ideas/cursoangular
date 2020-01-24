using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PI.CursoAngular.API.Models;

namespace PI.CursoAngular.API.Controllers
{
    [Route("api/identidad")]
    [ApiController]
    public class IdentidadController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<IdentidadController> _logger;

        public IdentidadController(IConfiguration configuration, ILogger<IdentidadController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(MLogin login)
        {
            try
            {
                //Verifica el usuario y contraseña
                if (login.Usuario != "usuario1" || login.Password != "123")
                {
                    return BadRequest("Usuario/Contraseña incorrectos");
                }

                //Genera el token
                var token = GenerarToken(login);

                return Ok(new
                {
                    response = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception e)
            {
                _logger.LogError("Login: " + e.Message, e);
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, e.Message);
            }
        }

        private JwtSecurityToken GenerarToken(MLogin login)
        {
            string ValidIssuer = _configuration["ApiAuth:Issuer"];
            string ValidAudience = _configuration["ApiAuth:Audience"];
            SymmetricSecurityKey IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["ApiAuth:SecretKey"]));

            //La fecha de expiracion sera el mismo dia a las 12 de la noche
            DateTime dtFechaExpiraToken;
            DateTime now = DateTime.Now;
            dtFechaExpiraToken = new DateTime(now.Year, now.Month, now.Day, 23, 59, 59, 999);

            //Agregamos los claim nuestros
            var claims = new[]
            {
                new Claim(Constantes.JWT_CLAIM_USUARIO, login.Usuario)
            };

            return new JwtSecurityToken
            (
                issuer: ValidIssuer,
                audience: ValidAudience,
                claims: claims,
                expires: dtFechaExpiraToken,
                notBefore: now,
                signingCredentials: new SigningCredentials(IssuerSigningKey, SecurityAlgorithms.HmacSha256)
            );
        }
    }
}