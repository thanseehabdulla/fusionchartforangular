import { MyErrorStateMatcher } from 'src/app/shared/validators/ErrorStateManager';
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { PublicationMasterService } from '../../../services/publication-master.service';
import { Publication } from 'src/app/shared/models/publication';
import { NotifyService } from 'src/app/shared/services/notify.service';
import * as _ from 'lodash';

@Component({
  selector: "publication-master-dialog",
  templateUrl: "publication-master-dialog.html",
  styleUrls: ["publication-master-dialog.scss"]
})
export class PublicationMasterDialog {
  publication: Publication;
  publicationDetailsForm = this.FB.group({
    publication_name  : ["",[ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
    publication_code  : ["",[ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
    publisher_name    : ["",[ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
    publication_type  : [{}, Validators.required]
  });


  typeList = ["P","T"];
  publicationTypeMapper = {
    "P": "Permanent", 
    "T": "Temporary"
  };
  matcher = new MyErrorStateMatcher();
  validationMessages = {
    'publicationName': {
      'required': 'Publication name is required!',
      'minlength' : 'Publication code must have minimum of 2 characters!',
      'maxlength' : 'Publication code must have maximum of 8 characters!',
    },
    'publicationCode': {
      'required': 'Publication code is required!',
      'minlength' : 'Publication code must have minimum of 2 characters!',
      'maxlength' : 'Publication code must have maximum of 8 characters!',
    },
    'publisherName': {
      'required': 'Publisher name is required!',
      'minlength' : 'Publication code must have minimum of 2 characters!',
      'maxlength' : 'Publication code must have maximum of 8 characters!',
    }
  }
  
  constructor(
    public dialogRef: MatDialogRef<PublicationMasterDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    private FB: FormBuilder,
    public publicationService: PublicationMasterService,
    private notify: NotifyService,
  ) {}

  ngOnInit() {
    this.publication = this.data.publication;
  }

  onCloseDialog(isChanged): void {
    if(this.publication.pki_publication_id)
      isChanged = true;
    this.dialogRef.close(isChanged);
  }

  save() {
    this.publication['fki_user_code']     = JSON.parse(localStorage.getItem('currentUser')).user.pki_user_code;
    this.publication['publication_type']  = this.publication.publication_type;
    
    let isExistArray = _.filter(this.data.publicationList,(x)=> { 
      if((x.pki_publication_id != this.publication.pki_publication_id) && 
        (x.publication_name == this.publication.publication_name || x.publication_code == this.publication.publication_code)
      ){
        return x;
      }
    });
    if(Object.keys(isExistArray).length>0){
      this.notify.showError("Publication with same publication name or code exist");
      return;
    }
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
