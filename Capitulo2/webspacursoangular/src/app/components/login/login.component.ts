import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/ilogin';
import { IResponse } from 'src/app/models/iresponse';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  subRef$: Subscription;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private securityService: SecurityService
  ) {

    this.securityService.LogOff();

    this.formLogin = formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  Login() {
    const usuarioLogin: ILogin = {
      usuario: this.formLogin.value.usuario,
      password: this.formLogin.value.password,
    };

    const url = 'http://localhost:50000/api/identidad/login';
    this.subRef$ = this.dataService.post<IResponse>(url,
      usuarioLogin)
      .subscribe(res => {
        const token = res.body.response;
        console.log('token', token);
        this.securityService.SetAuthData(token);
        this.router.navigate(['/home']);
      }, err => {
        console.log('Error en el login', err);
      });
  }

  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }

}
