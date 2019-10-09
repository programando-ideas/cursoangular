import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.css']
})
export class Componente2Component implements OnInit {
  imgSrc = 'https://raw.githubusercontent.com/programando-ideas/cursoangular/master/imagenes/programando-ideas.png';
  imgWidth = 200;
  constructor() { }

  ngOnInit() {
  }

  imgGrande() {
    this.imgWidth = 500;
  }

  imgChica() {
    this.imgWidth = 200;
  }
}
