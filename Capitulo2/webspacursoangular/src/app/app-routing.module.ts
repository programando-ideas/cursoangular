import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CliListaComponent } from './components/clientes/cli-lista.component';
import { CliEditComponent } from './components/clientes/cli-edit.component';
import { CliAddComponent } from './components/clientes/cli-add.component';
import { AuthGuard } from './services/auth/auth-guard';
import { EjemploXSSComponent } from './components/ejemplo-xss/ejemplo-xss.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'clilista', component: CliListaComponent, canActivate: [AuthGuard] },
  { path: 'cliedit/:id', component: CliEditComponent, canActivate: [AuthGuard] },
  { path: 'cliadd', component: CliAddComponent, canActivate: [AuthGuard] },
  { path: 'xss', component: EjemploXSSComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
