import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared/shared.module';

import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManagePublicationsComponent } from './components/manage-publications/manage-publications.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { InspectorLocationReportComponent } from './components/inspector-location-report/inspector-location-report.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { PublicationMasterComponent } from './components/manage-publications/publication-master/publication-master.component';
import { PublicationMasterDialog } from './components/manage-publications/publication-master-dialog/publication-master-dialog';

@NgModule({
  declarations: [
    ManageUsersComponent, 
    ManagePublicationsComponent, 
    ConfigurationsComponent, 
    InspectorLocationReportComponent, 
    SideNavComponent,
    PublicationMasterComponent,
    PublicationMasterDialog
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [PublicationMasterDialog],
})
export class AdminModule { }
