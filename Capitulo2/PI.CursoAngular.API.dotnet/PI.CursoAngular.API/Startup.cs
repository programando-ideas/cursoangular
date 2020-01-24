using AutoMapper;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using PI.CursoAngular.Repo.MariaDB;
using PI.CursoAngular.Repo.MariaDB.DBModelClientes;
using PI.CursoAngular.Repo.MariaDB.Interfaces;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
// using static: https://docs.microsoft.com/es-mx/dotnet/csharp/language-reference/keywords/using-static
using static PI.CursoAngular.API.Constantes;

namespace PI.CursoAngular.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-XSRF-TOKEN";
                options.SuppressXFrameOptionsHeader = false;
            });

            //Autenticacion
            services.AddAuthentication(options =>
             {
                 //AuthenticationScheme = "Bearer"
                 options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                 options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                 options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
             }).AddJwtBearer(jwtBearerOptions =>
             {
                 jwtBearerOptions.Events = new JwtBearerEvents()
                 {
                     OnTokenValidated = context =>
                     {
                         List<Claim> cl = new List<Claim>(((ClaimsIdentity)context.Principal.Identity).Claims);
                         string strUsuario = cl.Where(c => c.Type == JWT_CLAIM_USUARIO).First().Value;

                         if (string.IsNullOrWhiteSpace(strUsuario))
                         {
                             context.Fail("Unauthorized");
                         }

                         return Task.CompletedTask;
                     }
                 };

                 //https://tools.ietf.org/html/rfc7519#page-9
                 jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                 {
                     SaveSigninToken = true,
                     ValidateActor = true,
                     ValidateIssuer = true, //Issuer: Emisor
                     ValidateAudience = true, //Audience: Son los destinatarios del token
                     ValidateLifetime = true, //Lifetime: Tiempo de vida del token
                     ValidateIssuerSigningKey = true,
                     ValidIssuer = Configuration["ApiAuth:Issuer"],
                     ValidAudience = Configuration["ApiAuth:Audience"],
                     IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["ApiAuth:SecretKey"]))
                 };
             });

            //CORS
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins(new[]
                    {
                        "http://localhost:4200",
                        "http://localhost:5500"
                    })
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            //Mapeo de entidades db <-> model
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // Base de datos MariaDB
            string strCnnSQL = Configuration["connectionString"].ToString();
            services.AddDbContextPool<curso_angularContext>(
            options => options.UseMySql(strCnnSQL,
                      mysqlOptions =>
                      {
                          mysqlOptions.ServerVersion(new Version(10, 3, 13), ServerType.MariaDb);
                      }));

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IClientesRepository, ClientesRepository>();

            //LOGs - Serilog RollingLog
            Log.Logger = new LoggerConfiguration()
               .ReadFrom.Configuration(Configuration)
               .CreateLogger();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,
                              ILoggerFactory loggerFactory, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            //https://docs.microsoft.com/en-us/aspnet/core/migration/22-to-30?view=aspnetcore-3.0&tabs=visual-studio
            /*For most apps, calls to UseAuthentication, UseAuthorization, and UseCors must appear between 
             * the calls to UseRouting and UseEndpoints to be effective.*/
            app.UseAuthentication();
            app.UseAuthorization();

            app.Use(next => context =>
            {
                string path = context.Request.Path.Value;

                if (path != null && path.ToLower().Contains("/api"))
                {
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken,
                        new CookieOptions()
                        {
                            HttpOnly = false
                        });
                }

                return next(context);
            });

            app.UseCors("CorsPolicy");

            loggerFactory.AddSerilog();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
