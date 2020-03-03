import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { SideNavComponent } from './components/side-nav/side-nav.component';
// import { AdminComponent } from './components/admin/admin.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { InspectorLocationReportComponent } from './components/inspector-location-report/inspector-location-report.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePublicationsComponent } from './components/manage-publications/manage-publications.component';

const routes: Routes = [
  { 
    path: '', 
    component: SideNavComponent,
    children: [
      { path: '', component: ManageUsersComponent, canActivate: [AuthGuard] },
      { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard] },
      { path: 'publications', component: ManagePublicationsComponent, canActivate: [AuthGuard] },
      { path: 'location-report', component: InspectorLocationReportComponent, canActivate: [AuthGuard] },
      { path: 'configurations', component: ConfigurationsComponent, canActivate: [AuthGuard] }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
