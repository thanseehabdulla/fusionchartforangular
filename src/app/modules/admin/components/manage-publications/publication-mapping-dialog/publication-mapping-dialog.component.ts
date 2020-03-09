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
    console.log("Passed data",this.publication);
    this.selectedPublication = this.permanentOption;
  }

  save() {
    let details = {
      publication_type    : this.selectedPublication.pki_publication_id? 'M' : 'P',
      publication_id      : this.publication.pki_publication_id
    }
    if(this.selectedPublication.pki_publication_id){
      details['publication_map_id'] = this.selectedPublication.pki_publication_id
    }
    this.publicationService.mapPublication(details).subscribe((data)=> {
      console.log(data)
      this.onCloseDialog(true);
    },error => {
      this.setError(error);
      this.onCloseDialog(true);
    })
  }

  onCloseDialog(isChanged): void {
    this.dialogRef.close(isChanged);
  }
  setError(error:string){
    console.log(error);
    this.notify.showError(error);
  }
}
