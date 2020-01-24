import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ICliente } from 'src/app/models/icliente';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from 'src/app/models/mat-paginator-intl-cro';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CliDialogoBorrarComponent } from './dialogos/cli-dialogo-borrar.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cli-lista',
  templateUrl: './cli-lista.component.html',
  styles: [],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }],
})
export class CliListaComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  clientes: MatTableDataSource<ICliente>;
  subRef$: Subscription;
  displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'fechaDeNacimiento', 'actions'];
  cargando = true;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    const url = environment.urlAPI + 'api/clientes/lista';
    this.subRef$ = this.dataService.get<ICliente[]>(url)
      .subscribe(res => {
        this.cargando = false;
        this.clientes = new MatTableDataSource<ICliente>(res.body);
        this.clientes.paginator = this.paginator;
        this.clientes.sort = this.sort;
      },
        err => {
          console.log('Error al recuperar los clientes', err);
        });
  }
  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }

  editar(e) {
    console.log('Fila a editar', e);
    this.router.navigate(['/cliedit', e.id]);
  }

  borrar(cli: ICliente) {
    const dialogRef = this.dialog.open(CliDialogoBorrarComponent, {
      width: '350px',
      data: {
        id: cli.id,
        titulo: '¿Desea eliminar el cliente "' + cli.nombre + ' ' + cli.apellido + '"?',
        dato: 'Si continua no podra recuperar los cambios.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id > 0) {
        this.BorrarCliente(cli);
      }
    });
  }

  BorrarCliente(cli: ICliente) {
    this.cargando = true;

    const url = environment.urlAPI + 'api/clientes/eliminar/' + cli.id;
    this.subRef$ = this.dataService.delete<ICliente>(url)
      .subscribe(res => {
        const index: number = this.clientes.data.findIndex(d => d === cli);
        console.log(this.clientes.data.findIndex(d => d === cli));
        this.clientes.data.splice(index, 1);

        this.clientes = new MatTableDataSource<ICliente>(this.clientes.data);
        this.clientes.paginator = this.paginator;
        this.clientes.sort = this.sort;

        console.log('Cliente eliminado');
        this.cargando = false;
      }, err => {
        console.log('Error al actualizar el cliente', err);
        this.cargando = false;
      });
  }


  agregar() {
    this.router.navigate(['/cliadd']);
  }
}
