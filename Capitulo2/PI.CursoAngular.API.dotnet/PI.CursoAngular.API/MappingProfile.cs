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
                .ForMember(cl => cl.CliDirecciones, opt => opt.Ignore())
                .ForMember(cl => cl.CliTelefonos, opt => opt.Ignore())
                .AfterMap((clienteCRUD, clienteDB) => {

                    /////////////////
                    // Direcciones //
                    /////////////////
                    // delete - ids = Array [1,3,5]
                    var ids = clienteCRUD.Direcciones.Select(dir => dir.Id).ToList(); 
                    var direccionesBorrar = clienteDB.CliDirecciones.Where(dir => !ids.Contains(dir.Id)).ToList();
                    // *** Otra forma de hacerlo ***
                    //  https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.except?view=netcore-3.0
                    //  public override bool Equals(object obj)
                    //  public override int GetHashCode()
                    foreach (var dirB in direccionesBorrar)
                        clienteDB.CliDirecciones.Remove(dirB);

                    // insert
                    var direccionesAgregar = clienteCRUD.Direcciones.Where(mDir => mDir.Id <= 0).ToList();
                    foreach (var dirA in direccionesAgregar)
                        clienteDB.CliDirecciones.Add(new CliDirecciones() { Direccion = dirA.Direccion });

                    // update
                    var direccionesActualizar = clienteDB.CliDirecciones.Where(dir => ids.Contains(dir.Id) && dir.Id > 0).ToList();
                    foreach (var dirU in direccionesActualizar)
                        dirU.Direccion = clienteCRUD.Direcciones.Where(dir => dir.Id == dirU.Id).First().Direccion;

                    ///////////////
                    // Telefonos //
                    ///////////////
                    //delete
                    ids = clienteCRUD.Telefonos.Select(tel => tel.Id).ToList(); //Array de ids
                    var telefonosBorrar = clienteDB.CliTelefonos.Where(tel => !ids.Contains(tel.Id)).ToList();
                    foreach (var telB in telefonosBorrar)
                        clienteDB.CliTelefonos.Remove(telB);

                    //insert
                    var telefonosAgregar = clienteCRUD.Telefonos.Where(mTel => mTel.Id <= 0).ToList();
                    foreach (var telA in telefonosAgregar)
                        clienteDB.CliTelefonos.Add(new CliTelefonos() { Telefono = telA.Telefono });

                    //update
                    var telefonosActualizar = clienteDB.CliTelefonos.Where(tel => ids.Contains(tel.Id) && tel.Id > 0).ToList();
                    foreach (var telU in telefonosActualizar)
                        telU.Telefono = clienteCRUD.Telefonos.Where(tel => tel.Id == telU.Id).First().Telefono;
                });

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
