import { Component } from '@angular/core';

// Decorador @Component:
//    - Contiene los "metadatos" de un componente
//    - Indica que la clase debajo de este decorador contiene la logica del componente
@Component({
  // selector: es un selector CSS que le indica a Angular que debe instanciar este
  //           componente e insertar la vista (HTML) si encuentra este tag dentro 
  //           de otro HTML <app-root></app-root>
  selector: 'app-root',
  // template : Codigo HTML embebido en el componente (inline)
  // ``       : string multilinea
  //            (lo pueden encontrar como ECMAScript backticks)
  //            ECMAScript: es una especificación de lenguaje de programación publicada por
  //                        "ECMA International" implementada por varios lenguajes entre
  //                        ellos JavaScript
  template: `
    <h1 class="estilo1">Curso de Angular de {{title}}</h1>
    <app-componente1></app-componente1>
    <app-componente2></app-componente2>
    <app-componente3></app-componente3>
  `,
  // Hoja de estilo asociada al componente
  // Todos los estilos definidos aqui, sobrescriben los estilos globales styles.css"
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Programando Ideas';
}
