import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  navegar() {
    this.router.navigate(['/pagina1', { id: 1, param: 'prueba' }]);
  }
}
