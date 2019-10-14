import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { Pais } from 'src/app/models/pais';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.css']
})
export class FormPersonaComponent implements OnInit {
  persona: Persona;
  paises: Pais[];

  constructor() {
    this.persona = new Persona();
    this.paises = [
      {id: 1, nombre: 'México'},
      {id: 2, nombre: 'Perú'},
      {id: 3, nombre: 'España'},
      {id: 4, nombre: 'Argentina'},
      {id: 5, nombre: 'Colombia'},
    ];
  }

  ngOnInit() {
  }
  guardar(formData: any) {
    console.log(formData);
  }

}
