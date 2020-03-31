import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { InspectorLocationReportComponent } from './components/inspector-location-report/inspector-location-report.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePublicationsComponent } from './components/manage-publications/manage-publications.component';
import { PublicationMappingComponent } from './components/manage-publications/publication-mapping/publication-mapping.component';
import { PublicationMasterComponent } from './components/manage-publications/publication-master/publication-master.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: "full" },
      { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard] },
      {
        path: 'publications',
        component: ManagePublicationsComponent,
        children: [
          { path: '', redirectTo: 'master', pathMatch: "full" },
          { path: 'master', component: PublicationMasterComponent, canActivate: [AuthGuard] },
          { path: 'mapping', component: PublicationMappingComponent, canActivate: [AuthGuard] }
        ],
        canActivate: [AuthGuard]
      },
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
