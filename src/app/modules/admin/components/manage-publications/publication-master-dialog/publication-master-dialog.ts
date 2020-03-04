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
  typeList    = [{ name: "Permanent",code:"P" }, { name: "Temporary",code:"T" }];
  initialData = {
    publication_name  : "",
    publication_code  : "",
    publisher_name    : "",
    publication_type  : "Permanent",
    status            : 'A',
    fki_user_code     : "SAJNA",
    pki_publication_id: 0
  }
  statusMapper = {
    'Permanent' : 'P',
    'Temporary' : 'T',
    'T' : 'T',
    'P' : 'P'
  };
  constructor(
    public dialogRef: MatDialogRef<PublicationMasterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Publication,
    private FB: FormBuilder,
    public publicationService: PublicationMasterService,
    private notify: NotifyService,
  ) {}

  ngOnInit() {
    console.log("Passed data",this.data);
    if(!this.data.pki_publication_id){
        this.data = this.initialData
    }
    this.publication = this.data;
  }

  onNoClick(isChanged): void {
    if(this.publication.pki_publication_id)
      isChanged = true;
    this.dialogRef.close(isChanged);
  }

  save() {
    this.publication['fki_user_code']     = "sajna";
    this.publication['publication_type']  = this.statusMapper[this.publication.publication_type];
    if(this.publication.pki_publication_id){
      this.updatePublication();
    }else{
      this.addPublication();
    }
  }

  delete(){
    this.publicationService.deletePublication(this.publication.pki_publication_id)
    .subscribe(()=> {
      this.onNoClick(true);
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
      this.onNoClick(true);
    },error => {
      this.setError(error);
      this.onNoClick(false);
    })
  }

  updatePublication(){
    this.publicationService.updatePublication(this.publication).subscribe((data)=> {
      this.onNoClick(true);
    },error => {
      this.setError(error);
      this.onNoClick(true);
    })
  }
}
