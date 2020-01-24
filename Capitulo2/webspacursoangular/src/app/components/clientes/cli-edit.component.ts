import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICliente } from 'src/app/models/icliente';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { ICliTelefonos } from 'src/app/models/icli-telefonos.model';
import { ICliDirecciones } from 'src/app/models/icli-direcciones.model';
import { ErrorStateMatcher1 } from '../error-state-matcher1';
import { CliDialogoComponent } from './dialogos/cli-dialogo.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cli-edit',
  templateUrl: './cli-edit.component.html',
  styles: []
})
export class CliEditComponent implements OnInit, OnDestroy {
  private subParams: Subscription;
  idCliente: number;

  cargando = false;
  matcher = new ErrorStateMatcher1();
  formActualizarCliente: FormGroup;
  maxDate: Date;
  direcciones: ICliDirecciones[];
  telefonos: ICliTelefonos[];
  idDirTmp = 0;
  idTelTmp = 0;
  subRef$: Subscription;
  nombreCliente = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute) {

    this.formActualizarCliente = formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaDeNacimiento: ['', Validators.required]
    });

    this.direcciones = [];
    this.telefonos = [];

    this.maxDate = new Date();
  }

  ngOnInit() {
    this.cargando = true;

    this.subParams = this.route.params.subscribe(params => {
      this.idCliente = +params.id;
      console.log('Editar el cliente con id', params.id);

      const url = environment.urlAPI + 'api/clientes/cliente/' + this.idCliente.toString();
      this.subRef$ = this.dataService.get<ICliente>(url)
        .subscribe(res => {
          this.cargando = false;

          // Carga los datos del cliente recuperado
          const cli: ICliente = res.body;
          this.direcciones = cli.direcciones;
          this.telefonos = cli.telefonos;

          this.formActualizarCliente.patchValue(cli);
          console.log('Cliente recuperado', cli);
          this.nombreCliente = cli.nombre + ' ' + cli.apellido;
        },
          err => {
            console.log('Error al recuperar los clientes', err);
          });
    });
  }

  hasError(nombreControl: string, validacion: string) {
    const control = this.formActualizarCliente.get(nombreControl);
    return control.hasError(validacion);
  }

  ActualizarCliente() {
    const datosCliente: ICliente = {
      id: this.idCliente,
      nombre: this.formActualizarCliente.value.nombre,
      apellido: this.formActualizarCliente.value.apellido,
      edad: 0,
      fechaDeNacimiento: this.formActualizarCliente.value.fechaDeNacimiento,
      direcciones: this.direcciones,
      telefonos: this.telefonos
    };

    console.log('datosCliente', datosCliente);

    this.cargando = true;
    const url = environment.urlAPI + 'api/clientes/actualizar';
    this.subRef$ = this.dataService.post<ICliente>(url,
      datosCliente)
      .subscribe(res => {
        this.cargando = false;
        this.router.navigate(['/clilista']);
      }, err => {
        this.cargando = false;
        console.log('Error al actualizar el cliente', err);
      });
  }

  cancelar() {
    this.router.navigate(['/clilista']);
  }

  EditarDireccion(dir: ICliDirecciones) {
    const dialogRef = this.dialog.open(CliDialogoComponent, {
      width: '350px',
      data: {
        titulo: 'Editar Dirección (' + dir.direccion + ')',
        id: dir.id,
        dato: dir.direccion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dato) {
        const dirEditar = this.direcciones.find(d => {
          return d.id === result.id;
        });
        dirEditar.direccion = result.dato;
      }
    });
  }

  BorrarDireccion(dir: ICliDirecciones) {
    const index = this.direcciones.indexOf(dir, 0);
    if (index > -1) {
      this.direcciones.splice(index, 1);
    }
  }

  AgregarDireccion() {
    const dialogRef = this.dialog.open(CliDialogoComponent, {
      width: '350px',
      data: { titulo: 'Agregar Dirección', dato: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dato) {
        this.idDirTmp -= 1;
        this.direcciones.push({ id: this.idDirTmp, direccion: result.dato });
      }
    });
  }

  EditarTelefono(tel: ICliTelefonos) {
    const dialogRef = this.dialog.open(CliDialogoComponent, {
      width: '350px',
      data: {
        titulo: 'Editar Teléfono (' + tel.telefono + ')',
        id: tel.id,
        dato: tel.telefono
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dato) {
        const telEditar = this.telefonos.find(t => {
          return t.id === result.id;
        });
        telEditar.telefono = result.dato;
      }
    });
  }

  BorrarTelefono(tel: ICliTelefonos) {
    const index = this.telefonos.indexOf(tel, 0);
    if (index > -1) {
      this.telefonos.splice(index, 1);
    }
  }

  AgregarTelefono() {
    const dialogRef = this.dialog.open(CliDialogoComponent, {
      width: '350px',
      data: { titulo: 'Agregar Teléfono', dato: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result && result.dato) {
        this.idTelTmp -= 1;
        this.telefonos.push({ id: this.idTelTmp, telefono: result.dato });
      }
    });
  }

  ngOnDestroy() {
    if (this.subParams) { this.subParams.unsubscribe(); }
    if (this.subRef$) { this.subRef$.unsubscribe(); }
  }
}
