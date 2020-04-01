import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/modules/shared.module';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManagePublicationsComponent } from './components/manage-publications/manage-publications.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { InspectorLocationReportComponent } from './components/inspector-location-report/inspector-location-report.component';
import { PublicationMasterComponent } from './components/manage-publications/publication-master/publication-master.component';
import { PublicationMasterDialog } from './components/manage-publications/publication-master-dialog/publication-master-dialog';
import { ManageAgentsComponent } from './components/manage-users/manage-agents/manage-agents.component';
import { ManageEmployeesComponent } from './components/manage-users/manage-employees/manage-employees.component';
import { ManageEmployeesDailogComponent } from './components/manage-users/manage-employees/manage-employees-dailog/manage-employees-dailog.component';
import { PublicationMappingComponent } from './components/manage-publications/publication-mapping/publication-mapping.component';
import { PublicationMappingDialogComponent } from './components/manage-publications/publication-mapping-dialog/publication-mapping-dialog.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    ManageUsersComponent,
    ManagePublicationsComponent,
    ConfigurationsComponent,
    InspectorLocationReportComponent,
    PublicationMasterComponent,
    PublicationMasterDialog,
    ManageAgentsComponent,
    ManageEmployeesComponent,
    ManageEmployeesDailogComponent,
    ManageAgentsComponent,
    ManageEmployeesComponent,
    PublicationMappingComponent,
    PublicationMappingDialogComponent,
    AdminComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents: [
    PublicationMasterDialog,
    ManageEmployeesDailogComponent,
    PublicationMappingDialogComponent
  ]
})
export class AdminModule { }
