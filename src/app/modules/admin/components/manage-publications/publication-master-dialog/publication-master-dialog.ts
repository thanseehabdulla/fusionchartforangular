//publication master pop up to edit/delete/add publication

import { MyErrorStateMatcher } from 'src/app/shared/validators/ErrorStateManager';
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
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
    publication_name  : ["",[ Validators.required, this.noWhitespaceValidator, Validators.minLength(2), Validators.maxLength(255)]],
    publication_code  : ["",[ Validators.required, this.noWhitespaceValidator, Validators.minLength(2), Validators.maxLength(255)]],
    publisher_name    : ["",[ Validators.required, this.noWhitespaceValidator, Validators.minLength(2), Validators.maxLength(255)]],
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
      'required'  : 'Publication name is required!',
      'minlength' : 'Publication name must have minimum of 2 characters!',
      'maxlength' : 'Publication name should not exceed 8 characters!',
      'whitespace': 'Publication name should not have only white spaces!'
    },
    'publicationCode': {
      'required'  : 'Publication code is required!',
      'minlength' : 'Publication code must have minimum of 2 characters!',
      'maxlength' : 'Publication code should not exceed 8 characters!',
      'whitespace': 'Publication code should not have only white spaces!'
    },
    'publisherName': {
      'required'  : 'Publisher name is required!',
      'minlength' : 'Publisher name must have minimum of 2 characters!',
      'maxlength' : 'Publisher name should not exceed 8 characters!',
      'whitespace': 'Publisher name should not have only white spaces!'
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


  //white space validator
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


  //close dialog pop up
  onCloseDialog(isChanged): void {
    if(this.publication.pki_publication_id)
      isChanged = true;
    this.dialogRef.close(isChanged);
  }


  //save functionality
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


  //delete publication
  delete(){
    this.publicationService.deletePublication(this.publication.pki_publication_id)
    .subscribe(()=> {
      this.onCloseDialog(true);
      this.notify.showSuccess("Publication deleted successfully");
    },error => {
      this.setError(error);
    }) 
  }

  //set error in common function
  setError(error:string){
    console.log(error);
  }

  //add publication
  addPublication(){
    this.publicationService.addPublication(this.publication).subscribe((data)=> {
      this.onCloseDialog(true);
      this.notify.showSuccess("Publication added successfully");
    },error => {
      this.setError(error);
      this.onCloseDialog(false);
    })
  }

  //update publication
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
