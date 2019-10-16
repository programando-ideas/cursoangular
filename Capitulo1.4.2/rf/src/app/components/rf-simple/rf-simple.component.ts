import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rf-simple',
  templateUrl: './rf-simple.component.html',
  styleUrls: ['./rf-simple.component.css']
})
export class RfSimpleComponent implements OnInit {
  nombre = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  mostrar() {
    console.log(this.nombre.value);
  }

  agregar() {
    this.nombre.setValue('Juan Perez');
  }
}
