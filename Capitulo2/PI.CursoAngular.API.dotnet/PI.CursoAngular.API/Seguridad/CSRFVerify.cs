using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;

namespace PI.CursoAngular.API.Seguridad
{
    public class CSRFVerify : IAuthorizationFilter
    {
        private readonly ILogger<CSRFVerify> _logger;
        private readonly IAntiforgery _antiforgery;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public CSRFVerify(ILogger<CSRFVerify> logger, IAntiforgery antiforgery,
                          IWebHostEnvironment hostingEnvironment)
        {
            _logger = logger;
            _antiforgery = antiforgery;
            _hostingEnvironment = hostingEnvironment;
        }
        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                if (!_hostingEnvironment.IsDevelopment())
                {
                    await _antiforgery.ValidateRequestAsync(context.HttpContext);
                    _logger.LogInformation("ActualizarCliente::ValidateRequestAsync OK!");
                }
            }
            catch (AntiforgeryValidationException afve)
            {
                _logger.LogError(afve, afve.Message);
                context.Result = new UnauthorizedResult();
            }
        }
    }
}