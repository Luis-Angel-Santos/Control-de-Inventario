import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';
import { LoginComponent } from './modules/user/login/login.component';
import { RegisterComponent } from './modules/user/register/register.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    DashboardRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
