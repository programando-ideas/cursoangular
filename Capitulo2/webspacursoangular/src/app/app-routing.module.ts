import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CliListaComponent } from './components/clientes/cli-lista.component';
import { CliEditComponent } from './components/clientes/cli-edit.component';
import { CliAddComponent } from './components/clientes/cli-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clilista', component: CliListaComponent },
  { path: 'cliedit/:id', component: CliEditComponent },
  { path: 'cliadd', component: CliAddComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
