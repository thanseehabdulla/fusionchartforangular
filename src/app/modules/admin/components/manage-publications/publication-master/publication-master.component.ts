import { Message } from './../../../../../shared/models/meassage';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NotifyService } from "src/app/shared/services/notify.service";
import { MatDialog } from "@angular/material/dialog";
import { PublicationMasterDialog } from "../publication-master-dialog/publication-master-dialog";
import { HelperService } from 'src/app/shared/services/helper.service';
import { PublicationMasterService } from '../../../services/publication-master.service';
import { Publication } from 'src/app/shared/models/publication';

@Component({
  selector: "app-publication-master",
  templateUrl: "./publication-master.component.html",
  styleUrls: ["./publication-master.component.scss"]
})
export class PublicationMasterComponent implements OnInit {
  displayedColumns: string[] = ["publication_name","publication_code","publisher_name","publication_type","status"];
  statusMapper = {
    'A' : 'I',
    'I' : 'A'
  };
  dataSource: MatTableDataSource<Publication>;
  publication: Publication;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  publicationList = [];
  initialValues = {
    publication_name: "",
    publication_code: "",
    publisher_name: "",
    publication_type: "P",
    status: true
  }
  constructor(
    private notify: NotifyService,
    private dialog: MatDialog,
    private helperService: HelperService,
    private publicationService: PublicationMasterService,
    private Message :Message
  ) {
    this.dataSource = new MatTableDataSource(this.publicationList);
  }

  ngOnInit() {
    this.getPublication();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(data:object): void {
    if(!data){
      data = this.initialValues;
    }
    const dialogRef = this.dialog.open(PublicationMasterDialog, { width: "30%",data: data});
    dialogRef.afterClosed().subscribe(isChanged => {
     if(isChanged){
      this.getPublication();
     }
    });
  }

  confirmDialog(publicationId: string, status: string): void {
    let message = status ? "Inactive." : "Active.";
    message     = "You are about to change the Publication status to " +message + " Are you sure you want to do this?";
    this.helperService.confirmDialog( message,(data: boolean) => {
      if(data){
        this.publicationService.toggleActivation(publicationId, this.statusMapper[status])
          .subscribe(()=> {
            this.getPublication();
            this.notify.showSuccess(this.Message.updatePublicationMsg);
          },error => {
            this.setError(error);
          }) 
        }
      }
    );
  }

  setDetails(publications:Publication[]){
    this.publicationList      = publications;
    this.dataSource           = new MatTableDataSource(this.publicationList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  setError(error:string){
    this.notify.showError(error);
  }

  getPublication(){
    this.publicationService.getPublications().subscribe( (publications:Publication[]) => {
      this.setDetails(publications);
    },error => { 
      this.setError(error);
    })
  }
}
