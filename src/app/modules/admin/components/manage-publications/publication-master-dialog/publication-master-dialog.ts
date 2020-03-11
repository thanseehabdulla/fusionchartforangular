import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { PublicationMasterService } from '../../../services/publication-master.service';
import { Publication } from 'src/app/shared/models/publication';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: "publication-master-dialog",
  templateUrl: "publication-master-dialog.html",
  styleUrls: ["publication-master-dialog.scss"]
})
export class PublicationMasterDialog {
  publication: Publication;
  publicationDetailsForm = this.FB.group({
    publication_name  : ["", Validators.required],
    publication_code  : ["", Validators.required],
    publisher_name    : ["", Validators.required],
    publication_type  : [{}, Validators.required]
  });

  initialData = {
    publication_name  : "",
    publication_code  : "",
    publisher_name    : "",
    publication_type  : "P",
    status            : "A",
    fki_user_code     : "",
    pki_publication_id: 0
  }

  typeList = ["P","T"];
  publicationTypeMapper = {
    "P": "Permanent", 
    "T": "Temporary"
  };
  
  constructor(
    public dialogRef: MatDialogRef<PublicationMasterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Publication,
    private FB: FormBuilder,
    public publicationService: PublicationMasterService,
    private notify: NotifyService,
  ) {}

  ngOnInit() {
    if(!this.data.pki_publication_id){
        this.data = this.initialData
    }
    this.publication = this.data;
  }

  onCloseDialog(isChanged): void {
    if(this.publication.pki_publication_id)
      isChanged = true;
    this.dialogRef.close(isChanged);
  }

  save() {
    this.publication['fki_user_code']     = JSON.parse(localStorage.getItem('currentUser')).user.pki_user_code;
    this.publication['publication_type']  = this.publication.publication_type;
    if(this.publication.pki_publication_id){
      this.updatePublication();
    }else{
      this.addPublication();
    }
  }

  delete(){
    this.publicationService.deletePublication(this.publication.pki_publication_id)
    .subscribe(()=> {
      this.onCloseDialog(true);
      this.notify.showSuccess("Publication deleted successfully");
    },error => {
      this.setError(error);
    }) 
  }

  setError(error:string){
    console.log(error);
    this.notify.showError(error);
  }

  addPublication(){
    this.publicationService.addPublication(this.publication).subscribe((data)=> {
      this.onCloseDialog(true);
      this.notify.showSuccess("Publication added successfully");
    },error => {
      this.setError(error);
      this.onCloseDialog(false);
    })
  }

  updatePublication(){
    this.publicationService.updatePublication(this.publication).subscribe((data)=> {
      this.onCloseDialog(true);
      this.notify.showSuccess("Publication updated successfully");
    },error => {
      this.setError(error);
      this.onCloseDialog(true);
    })
  }
}
