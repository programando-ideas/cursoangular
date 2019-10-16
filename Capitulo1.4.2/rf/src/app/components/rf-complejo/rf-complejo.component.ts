import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rf-complejo',
  templateUrl: './rf-complejo.component.html',
  styleUrls: ['./rf-complejo.component.css']
})
export class RfComplejoComponent implements OnInit {
  paises: Pais[];
  errores: any;

  personaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
    apellido: new FormControl(),
    idpais: new FormControl()
  });

  constructor() {
    this.paises = [
      { id: 1, nombre: 'México' },
      { id: 2, nombre: 'Perú' },
      { id: 3, nombre: 'España' },
      { id: 4, nombre: 'Argentina' },
      { id: 5, nombre: 'Colombia' },
    ];
  }

  ngOnInit() {
  }

  guardar() {
    console.log(this.personaForm.value);
  }

  get controlNombre() {
    return this.personaForm.get('nombre');
  }

  erroresMostrar() {
    this.errores = JSON.stringify(this.controlNombre.errors);
  }
}
