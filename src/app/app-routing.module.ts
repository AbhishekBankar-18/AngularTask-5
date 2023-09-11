import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HodDashComponent } from './hod-dash/hod-dash.component';
import { HomapageComponent } from './homapage/homapage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StaffDashComponent } from './staff-dash/staff-dash.component';

const routes: Routes = [
  {path : '', redirectTo : 'homepage', pathMatch : 'full'},
  { path: 'login', component : LoginComponent},
  { path : 'signup', component : RegistrationComponent},
  { path : 'hodDash/:id', component : HodDashComponent},
  { path : 'staffDash/:id', component : StaffDashComponent},
  { path : 'homepage', component : HomapageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
