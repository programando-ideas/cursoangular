using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PI.CursoAngular.API.Models;
using AutoMapper;
using PI.CursoAngular.Repo.MariaDB.Interfaces;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using PI.CursoAngular.Repo.MariaDB.DBModelClientes;
using Microsoft.AspNetCore.Antiforgery;
using PI.CursoAngular.API.Seguridad;

namespace PI.CursoAngular.API.Controllers
{
    [Route("api/clientes")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IClientesRepository _cliRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ClientesController> _logger;
        private readonly IAntiforgery _antiforgery;

        public ClientesController(IMapper mapper, 
                                  IClientesRepository cliRepository,
                                  IUnitOfWork unitOfWork,
                                  ILogger<ClientesController> logger,
                                  IAntiforgery antiforgery) 
        {
            _mapper = mapper;
            _cliRepository = cliRepository;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _antiforgery = antiforgery;
        }

        [Authorize]
        [HttpGet]
        [Route("lista")]
        public async Task<IActionResult> Lista()
        {
            try
            {
                var clientes = await _cliRepository.ObtenerClientes();

                var retClientes = _mapper.Map<IEnumerable<Clientes>, IEnumerable<MCliente>>(clientes);

                return Ok(retClientes);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500, e);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("cliente/{id}")]
        public async Task<IActionResult> RecuperarClienteXId(int id)
        {
            try
            {
                // Recuperamos el cliente de la base
                Clientes clienteDB = await _cliRepository.ObtenerClientePorIdAsync(id);

                if (clienteDB == null)
                {
                    return NotFound("El cliente no existe");
                }

                var retClientes = _mapper.Map<Clientes, MCliente>(clienteDB);

                return Ok(retClientes);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500, e);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("agregar")]
        [CSRFVerify]
        public async Task<IActionResult> AgregarCliente(MCliente cli)
        {
            try
            {
                var cliAgregar = _mapper.Map<MCliente, Clientes>(cli);

                await _cliRepository.AgregarClienteAsync(cliAgregar);
                await _unitOfWork.CompleteAsync();

                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500, e);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("actualizar")]
        [CSRFVerify]
        public async Task<IActionResult> ActualizarCliente(MCliente clienteCRUD)
        {
            try
            {
                // Recuperamos el cliente de la base
                Clientes clienteDB = await _cliRepository.ObtenerClientePorIdAsync(clienteCRUD.Id);

                if (clienteDB == null)
                {
                    return NotFound("El cliente no existe");
                }

                _mapper.Map(clienteCRUD, clienteDB);

                await _unitOfWork.CompleteAsync();

                var result = _mapper.Map<Clientes, MCliente>(clienteDB);
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500, e);
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarCliente(int id)
        {
            try
            {
                // Recuperamos el cliente de la base
                Clientes clienteDB = await _cliRepository.ObtenerClientePorIdAsync(id);

                if (clienteDB == null)
                {
                    return NotFound("El cliente no existe");
                }

                _cliRepository.EliminarCliente(clienteDB);

                await _unitOfWork.CompleteAsync();

                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500, e);
            }
        }
    }
}