import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css']
})
export class Pagina1Component implements OnInit, OnDestroy {
  private sub: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params['id']);
      console.log(params['param']);
    });
  }

  navegar() {
    this.router.navigate(['/pagina2']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
