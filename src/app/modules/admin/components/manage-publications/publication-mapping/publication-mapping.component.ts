//Page to list the temporary publication list

import { PublicationMappingDialogComponent } from './../publication-mapping-dialog/publication-mapping-dialog.component';
import { Component, OnInit, ViewChild, Input } from "@angular/core";
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
  selector: 'app-publication-mapping',
  templateUrl: './publication-mapping.component.html',
  styleUrls: ['./publication-mapping.component.scss']
})
export class PublicationMappingComponent implements OnInit {

  displayedColumns: string[] = ["publication_name","publication_code","publisher_name","publication_type","map_to"];
  tableDataSource: MatTableDataSource<Publication>;
  publication: Publication;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  temporaryPublicationList = [];
  fullPublicationList      = [];
  constructor(
    private notify: NotifyService,
    private dialog: MatDialog,
    private helperService: HelperService,
    private publicationService: PublicationMasterService
  ) {
    this.tableDataSource = new MatTableDataSource(this.temporaryPublicationList);
  }

  ngOnInit() {
    this.getPublication();
  }

  //filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filterPredicate = (publication: Publication, filterValue: string) => {
      return publication['publication_name'].trim().toLowerCase().indexOf(filterValue.trim().toLowerCase())> -1 ||
      publication['publication_code'].trim().toLowerCase().indexOf(filterValue.trim().toLowerCase())> -1 ||
      publication['publisher_name'].trim().toLowerCase().indexOf(filterValue.trim().toLowerCase())> -1 ||
      publication['publication_type'].trim().toLowerCase().indexOf(filterValue.trim().toLowerCase())> -1 ;
    };
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  //get publication list(temporary)
  getPublication(){
    this.publicationService.getPublications().subscribe( (publications:Publication[]) => {
      this.fullPublicationList      =  publications;
      this.temporaryPublicationList =  publications.filter(function(publication) {
        return publication.publication_type == 'T';
      });
      this.setDetails();
    },error => { 
      this.setError(error);
    })
  }


  //set details to mat table
  setDetails(){
    this.tableDataSource = new MatTableDataSource(this.temporaryPublicationList);
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }


  //set error in common function
  setError(error:string){
    console.log(error);
  }


  //open pop up function
  openDialog(data:object): void {
    data['permanentPublicationList'] =  this.fullPublicationList.filter(function(publication) {
      return publication.publication_type == 'P';
    });
    const dialogRef = this.dialog.open(PublicationMappingDialogComponent, { width: "30%",data: data});
    dialogRef.afterClosed().subscribe(isChanged => {
     if(isChanged){
      this.getPublication();
     }
    });
  }

}
