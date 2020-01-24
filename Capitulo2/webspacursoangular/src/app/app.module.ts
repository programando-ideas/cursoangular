import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { CliListaComponent } from './components/clientes/cli-lista.component';
import { CliAddComponent } from './components/clientes/cli-add.component';
import { CliEditComponent } from './components/clientes/cli-edit.component';
import { CliDialogoComponent } from './components/clientes/dialogos/cli-dialogo.component';
import { CliDialogoBorrarComponent } from './components/clientes/dialogos/cli-dialogo-borrar.component';
import { JwtInterceptor } from './services/auth/jwt-interceptor';
import { EjemploXSSComponent } from './components/ejemplo-xss/ejemplo-xss.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavmenuComponent,
    PageNotFoundComponent,
    CliListaComponent,
    CliAddComponent,
    CliEditComponent,
    CliDialogoComponent,
    CliDialogoBorrarComponent,
    EjemploXSSComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [CliDialogoComponent, CliDialogoBorrarComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
