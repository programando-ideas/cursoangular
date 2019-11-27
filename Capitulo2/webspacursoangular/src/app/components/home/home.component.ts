import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICliente } from 'src/app/models/icliente';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  clientes: ICliente[];
  subRef$: Subscription;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    const url = 'http://localhost:50000/api/clientes/lista';
    this.subRef$ = this.dataService.get<ICliente[]>(url)
    .subscribe(res => {
        this.clientes = res.body;
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

}
