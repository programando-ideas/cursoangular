import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICliente } from 'src/app/models/icliente';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cli-edit',
  templateUrl: './cli-edit.component.html',
  styles: []
})
export class CliEditComponent implements OnInit, OnDestroy {
  private subParams: Subscription;
  cliente: ICliente = {
    id: 0, nombre: '', apellido: '', edad: 0, fechaDeNacimiento: null, direcciones: null, telefonos: null
  };

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subParams = this.route.params.subscribe(params => {
      this.cliente.id = params.id;
      console.log('Editar el cliente con id', params.id);
    });
  }

  ngOnDestroy() {
    if (this.subParams) { this.subParams.unsubscribe(); }
  }
}
