import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";

export interface DialogData {
    publication_name: string;
    publication_code: string;
    publisher_name: string;
    publication_type: string;
    id: number;
    status:boolean
}

@Component({
  selector: "publication-master-dialog",
  templateUrl: "publication-master-dialog.html",
  styleUrls: ["publication-master-dialog.scss"]
})
export class PublicationMasterDialog {
    publication: DialogData;
    publicationDetailsForm = this.FB.group({
        publication_name: ["", Validators.required],
        publication_code: ["", Validators.required],
        publisher_name: ["", Validators.required],
        publication_type: [{}, Validators.required]
    });

  typeList = [{ name: "Permanent",code:"P" }, { name: "Temporary",code:"P" }];

  constructor(
    public dialogRef: MatDialogRef<PublicationMasterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private FB: FormBuilder
  ) {}

  ngOnInit() {
    console.log("Passed data",this.data);
    if(this.data.id == 0){
        this.data = {
            publication_name: "",
            publication_code: "",
            publisher_name: "",
            publication_type: "Permanent",
            id: 0,
            status:true
        }
    }
    this.publication = this.data;
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    console.log("save ....");
    console.log(this.publicationDetailsForm.value);
  }
}
