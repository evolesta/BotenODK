import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guard.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { DatamodelsComponent } from './secure/datamodels/datamodels.component';
import { UsermanagementComponent } from './secure/usermanagement/usermanagement.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard]},
  { path: 'logout', component: LogoutComponent, canActivate: [GuardGuard]},
  { path: 'usermanagement', component: UsermanagementComponent, canActivate: [GuardGuard]},
  { path: 'datamodels', component: DatamodelsComponent, canActivate: [GuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
