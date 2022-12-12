import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleChartComponent } from './charts/example-chart/example-chart.component';
import { GuardGuard } from './guard.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { DatamodelsComponent } from './secure/datamodels/datamodels.component';
import { FeedsComponent } from './secure/feeds/feeds.component';
import { UsermanagementComponent } from './secure/usermanagement/usermanagement.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard]},
  { path: 'logout', component: LogoutComponent, canActivate: [GuardGuard]},
  { path: 'usermanagement', component: UsermanagementComponent, canActivate: [GuardGuard]},
  { path: 'datamodels', component: DatamodelsComponent, canActivate: [GuardGuard]},
  { path: 'feeds', component: FeedsComponent, canActivate: [GuardGuard]},
  { path: 'testchart', component: ExampleChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
