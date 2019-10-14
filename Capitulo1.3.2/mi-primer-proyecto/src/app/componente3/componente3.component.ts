import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-componente3',
  templateUrl: './componente3.component.html',
  styleUrls: ['./componente3.component.css']
})
export class Componente3Component implements OnInit {
  persona: Persona;
  hoy = Date.now();
  constructor() {
    this.persona = new Persona();
  }

  ngOnInit() {
  }

}
