import { Component, OnDestroy } from '@angular/core';
import { SecurityService } from './services/security.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  IsAuthenticated = false;
  title = 'webspacursoangular';
  private subsAuth$: Subscription;

  constructor(
    private securityService: SecurityService
  ) {
    this.IsAuthenticated = this.securityService.IsAuthorized;

    // Nos suscribimos al observador de los eventos de auth.
    this.subsAuth$ = this.securityService.authChallenge$.subscribe(
      (isAuth) => {
        this.IsAuthenticated = isAuth;
      });
  }

  ngOnDestroy() {
    if (this.subsAuth$) {
      this.subsAuth$.unsubscribe();
    }
  }


}
