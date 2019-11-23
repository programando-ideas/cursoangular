import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/ilogin';
import { IResponse } from 'src/app/models/iresponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  subRef$: Subscription;

  constructor(
    formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
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

    this.subRef$ = this.http.post<IResponse>('http://localhost:50000/api/identidad/login',
        usuarioLogin, { observe: 'response' })
        .subscribe(res => {
          const token = res.body.response;
          console.log('token', token);
          sessionStorage.setItem('token', token);
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
