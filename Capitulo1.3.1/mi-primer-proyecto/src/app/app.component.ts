import { Component } from '@angular/core';

// Decorador @Component:
//    - Contiene los "metadatos" de un componente
//    - Indica que la clase (class) debajo de este decorador
//      contiene la logica del componente
@Component({
  selector: 'app-root',
  // template : Codigo HTML embebido en el componente (inline)
  // ``       : string multilinea - ECMAScript 2015 backticks
  //            ECMAScript: es una especificación de lenguaje
  //                        de programación publicada por
  //                        ECMA International implementada
  //                        por varios lenguajes entre ellos JavaScript
  template: `
    <h1>Curso de Angular de {{title}}</h1>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Programando Ideas';
}
