import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.css']
})
export class Componente1Component implements OnInit {
  ciudades = ['Buenos Aires', 'México', 'Madrid'];
  constructor() { }

  ngOnInit() {
  }

  agregarCiudad(nombreCiudad: string) {
    if (!nombreCiudad) {
      alert('Ingrese la ciudad');
      return;
    }

    this.ciudades.push(nombreCiudad);
  }

  borrarCiudad(nombreCiudad: string) {
    const index = this.ciudades.indexOf(nombreCiudad);
    this.ciudades.splice(index, 1);
  }
}
