//Model to map the temporary publications to others/permanent

import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PublicationMasterService } from '../../../services/publication-master.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-publication-mapping-dialog',
  templateUrl: './publication-mapping-dialog.component.html',
  styleUrls: ['./publication-mapping-dialog.component.scss']
})
export class PublicationMappingDialogComponent {
  selectedPublication;
  permanentOption = {
    publication_name : "Permanent"
  }
  constructor(
    public dialogRef: MatDialogRef<PublicationMappingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public publication,
    public publicationService: PublicationMasterService,
    private notify: NotifyService
    ) { }

  ngOnInit() {
    this.publication.permanentPublicationList.unshift(this.permanentOption);
    this.selectedPublication = this.permanentOption;
  }


  //save mapping
  save() {
    let details = {
      publication_type    : this.selectedPublication.pki_publication_id? 'M' : 'P',
      publication_id      : this.publication.pki_publication_id
    }
    if(this.selectedPublication.pki_publication_id){
      details['publication_map_id'] = this.selectedPublication.pki_publication_id
    }
    this.publicationService.mapPublication(details).subscribe((data)=> {
      this.notify.showSuccess("Publication mapped successfully");
      this.onCloseDialog(true);
    },error => {
      this.setError(error);
      this.onCloseDialog(true);
    })
  }

  //close pop up
  onCloseDialog(isChanged): void {
    this.dialogRef.close(isChanged);
  }

  //set error details
  setError(error:string){
    console.log(error);
  }
}
