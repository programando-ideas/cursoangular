import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICliente } from 'src/app/models/icliente';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  clientes: ICliente[];
  subRef$: Subscription;

  constructor(
    private http: HttpClient) { }

  ngOnInit() {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    console.log('get token', token);

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);

    this.subRef$ = this.http.get<ICliente[]>('http://localhost:50000/api/clientes/lista',
      {
        headers: httpHeaders,
        observe: 'response'
      }).subscribe(res => {
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
