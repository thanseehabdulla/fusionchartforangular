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
      { path: '', component: ManageUsersComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'publications', component: ManagePublicationsComponent },
      { path: 'location-report', component: InspectorLocationReportComponent },
      { path: 'configurations', component: ConfigurationsComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
