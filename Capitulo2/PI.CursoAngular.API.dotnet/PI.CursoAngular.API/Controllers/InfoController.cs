using Microsoft.AspNetCore.Mvc;
using System;
using System.Reflection;
using System.Text;

namespace PI.CursoAngular.API.Controllers
{
    [Route("api/info")]
    [ApiController]
    public class InfoController : ControllerBase
    {
        [HttpGet]
        public IActionResult Version()
        {
            try
            {
                Assembly objAssembly = null;
                StringBuilder sblVersion = new StringBuilder();
                Attribute objAtributo = default;

                objAssembly = Assembly.GetExecutingAssembly();

                objAtributo = Attribute.GetCustomAttribute(objAssembly, typeof(AssemblyTitleAttribute));
                sblVersion.Append(((AssemblyTitleAttribute)objAtributo).Title);
                sblVersion.Append(" v. ");
                sblVersion.Append(objAssembly.GetName().Version.ToString());

                return Ok(new { message = sblVersion.ToString() });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}