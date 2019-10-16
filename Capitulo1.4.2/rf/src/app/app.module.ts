import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RfSimpleComponent } from './components/rf-simple/rf-simple.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RfComplejoComponent } from './components/rf-complejo/rf-complejo.component';

@NgModule({
  declarations: [
    AppComponent,
    RfSimpleComponent,
    RfComplejoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
