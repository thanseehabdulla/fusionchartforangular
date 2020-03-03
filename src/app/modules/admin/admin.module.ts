import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared/shared.module';

import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManagePublicationsComponent } from './components/manage-publications/manage-publications.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { InspectorLocationReportComponent } from './components/inspector-location-report/inspector-location-report.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { PublicationMasterComponent } from './components/manage-publications/publication-master/publication-master.component';
import { PublicationMasterDialog } from './components/manage-publications/publication-master-dialog/publication-master-dialog';
import { ManageAgentsComponent } from './components/manage-users/manage-agents/manage-agents.component';
import { ManageEmployeesComponent } from './components/manage-users/manage-employees/manage-employees.component';

@NgModule({
  declarations: [
    ManageUsersComponent, 
    ManagePublicationsComponent, 
    ConfigurationsComponent, 
    InspectorLocationReportComponent, 
    SideNavComponent,
    PublicationMasterComponent,
    PublicationMasterDialog,
    ManageAgentsComponent, ManageEmployeesComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [PublicationMasterDialog],
})
export class AdminModule { }
