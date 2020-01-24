import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICliDirecciones } from 'src/app/models/icli-direcciones.model';
import { ErrorStateMatcher1 } from '../error-state-matcher1';
import { ICliTelefonos } from 'src/app/models/icli-telefonos.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CliDialogoComponent } from './dialogos/cli-dialogo.component';
import { Subscription } from 'rxjs';
import { ICliente } from 'src/app/models/icliente';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cli-add',
  templateUrl: './cli-add.component.html',
  styles: []
})
export class CliAddComponent implements OnInit, OnDestroy {
  cargando = false;
  matcher = new ErrorStateMatcher1();
  formAgregarCliente: FormGroup;
  maxDate: Date;
  direcciones: ICliDirecciones[];
  telefonos: ICliTelefonos[];
  idDirTmp = 0;
  idTelTmp = 0;
  subRef$: Subscription;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private dataService: DataService) {

    this.formAgregarCliente = formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaDeNacimiento: ['', Validators.required]
    });

    this.direcciones = [];
    this.telefonos = [];

    this.maxDate = new Date();
  }
  ngOnInit() { }

  AgregarCliente() {
    const datosCliente: ICliente = {
      id: 0,
      nombre: this.formAgregarCliente.value.nombre,
      apellido: this.formAgregarCliente.value.apellido,
      edad: 0,
      fechaDeNacimiento: this.formAgregarCliente.value.fechaDeNacimiento,
      direcciones: this.direcciones,
      telefonos: this.telefonos
    };

    console.log('datosCliente', datosCliente);

    this.cargando = true;
    const url = environment.urlAPI + 'api/clientes/agregar';
    this.subRef$ = this.dataService.post<ICliente>(url,
      datosCliente)
      .subscribe(res => {
        this.cargando = false;
        this.router.navigate(['/clilista']);
      }, err => {
        this.cargando = false;
        console.log('Error al crear el cliente', err);
      });
  }

  cancelar() {
    this.router.navigate(['/clilista']);
  }

  // Direcciones
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

  // Telefonos
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

  hasError(nombreControl: string, validacion: string) {
    const control = this.formAgregarCliente.get(nombreControl);
    return control.hasError(validacion);
  }

  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }
}
