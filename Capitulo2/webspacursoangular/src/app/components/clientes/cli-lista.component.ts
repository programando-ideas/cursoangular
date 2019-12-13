import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ICliente } from 'src/app/models/icliente';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from 'src/app/models/mat-paginator-intl-cro';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    const url = 'http://localhost:50000/api/clientes/lista';
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

  borrar(e) {
    console.log('borrar', e);
  }

  agregar() {
    this.router.navigate(['/cliadd']);
  }
}
