using Microsoft.AspNetCore.Mvc;
using System;

namespace PI.CursoAngular.API.Seguridad
{
    [AttributeUsage(AttributeTargets.Method)]
    public class CSRFVerifyAttribute : TypeFilterAttribute
    {
        public CSRFVerifyAttribute()
            : base(typeof(CSRFVerify)) { }
    }
}
