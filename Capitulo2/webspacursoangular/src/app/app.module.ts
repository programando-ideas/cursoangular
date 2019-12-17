import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    CliDialogoBorrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [CliDialogoComponent, CliDialogoBorrarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
