using AutoMapper;
using PI.CursoAngular.API.Models;
using PI.CursoAngular.Repo.MariaDB.DBModelClientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PI.CursoAngular.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<MCliente, Clientes>()
                .ForMember(cl => cl.Id, opt => opt.MapFrom(mcl => mcl.Id))
                .ForMember(cl => cl.Nombre, opt => opt.MapFrom(mcl => mcl.Nombre))
                .ForMember(cl => cl.Apellido, opt => opt.MapFrom(mcl => mcl.Apellido))
                .ForMember(cl => cl.Fechadenacimiento, opt => opt.MapFrom(mcl => mcl.FechaDeNacimiento))
                .ForMember(cl => cl.CliDirecciones, opt => opt.MapFrom(mcl => mcl.Direcciones))
                .ForMember(cl => cl.CliTelefonos, opt => opt.MapFrom(mcl => mcl.Telefonos));

            CreateMap<Clientes, MCliente>()
                .ForMember(mcl => mcl.Id, opt => opt.MapFrom(cl => cl.Id))
                .ForMember(mcl => mcl.Nombre, opt => opt.MapFrom(cl => cl.Nombre))
                .ForMember(mcl => mcl.Apellido, opt => opt.MapFrom(cl => cl.Apellido))
                .ForMember(mcl => mcl.FechaDeNacimiento, opt => opt.MapFrom(cl => cl.Fechadenacimiento))
                .ForMember(mcl => mcl.Edad, opt => opt.MapFrom(cl => DateTime.Today.AddTicks(-cl.Fechadenacimiento.Ticks).Year - 1))
                .ForMember(mcl => mcl.Direcciones, opt => opt.MapFrom(cl => cl.CliDirecciones))
                .ForMember(mcl => mcl.Telefonos, opt => opt.MapFrom(cl => cl.CliTelefonos));

            CreateMap<MCliTelefonos, CliTelefonos>()
                .ForMember(mcl => mcl.Id, opt => opt.MapFrom(cl => cl.Id))
                .ForMember(mcl => mcl.Telefono, opt => opt.MapFrom(cl => cl.Telefono));
            CreateMap<CliTelefonos, MCliTelefonos>()
                .ForMember(mcl => mcl.Id, opt => opt.MapFrom(cl => cl.Id))
                .ForMember(mcl => mcl.Telefono, opt => opt.MapFrom(cl => cl.Telefono));
            CreateMap<MCliDirecciones, CliDirecciones>()
                .ForMember(mcl => mcl.Id, opt => opt.MapFrom(cl => cl.Id))
                .ForMember(mcl => mcl.Direccion, opt => opt.MapFrom(cl => cl.Direccion));
            CreateMap<CliDirecciones, MCliDirecciones>()
                .ForMember(mcl => mcl.Id, opt => opt.MapFrom(cl => cl.Id))
                .ForMember(mcl => mcl.Direccion, opt => opt.MapFrom(cl => cl.Direccion));

        }

    }
}
