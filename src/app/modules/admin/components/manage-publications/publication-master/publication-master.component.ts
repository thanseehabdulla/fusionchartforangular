import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { HttpConnectionService } from "src/app/shared/services/http-connection.service";
import { NotifyService } from "src/app/shared/services/notify.service";
import { MatDialog } from "@angular/material/dialog";
import { PublicationMasterDialog } from "../publication-master-dialog/publication-master-dialog";
import { HelperService } from 'src/app/shared/services/helper.service';

export interface PublicationData {
  publicationName: string;
  publicationCode: string;
  publisherName: string;
  publicationType: string;
  status:boolean
}

@Component({
  selector: "app-publication-master",
  templateUrl: "./publication-master.component.html",
  styleUrls: ["./publication-master.component.scss"]
})
export class PublicationMasterComponent implements OnInit {
  displayedColumns: string[] = [
    "publicationName",
    "publicationCode",
    "publisherName",
    "publicationType",
    "status"
  ];
  dataSource: MatTableDataSource<PublicationData>;
  publication: PublicationData;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  publicationList = [];

  constructor(
    private http: HttpConnectionService,
    private notify: NotifyService,
    public dialog: MatDialog,
    public helperService: HelperService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.publicationList);
  }

  ngOnInit() {
    // this.http.get("/publication").subscribe(
    //   (data:any) =>{
    let data = [
      {
        publicationName: "Malayala manorama",
        publicationCode: "1234",
        publisherName: "Jiason",
        publicationType: "Permanent"
      },
      {
        publicationName: "Malayala manorama",
        publicationCode: "SDSD",
        publisherName: "Shyan",
        publicationType: "Permanent",
        status:true
      },
      {
        publicationName: "Malayala manorama",
        publicationCode: "SDSD",
        publisherName: "Ram",
        publicationType: "Permanent",
        status:false
      },
      {
        publicationName: "Malayala manorama",
        publicationCode: "FGFG",
        publisherName: "Gdf",
        publicationType: "Permanent",
        status:true
      },
      {
        publicationName: "Malayala manorama",
        publicationCode: "ETET",
        publisherName: "Rghgsa",
        publicationType: "Temporary"
      },
      {
        publicationName: "Malayala manorama",
        publicationCode: "HHHH",
        publisherName: "Jiason",
        publicationType: "Temporary"
      },
      {
        publicationName: "Malayala manorama",
        publicationCode: "GGJH",
        publisherName: "Jiason",
        publicationType: "Temporary"
      },
      {
        publicationName: "Malayala manorama",
        publicationCode: "GFGF",
        publisherName: "Jiason",
        publicationType: "Temporary"
      }
    ];
    this.publicationList = data;
    this.dataSource = new MatTableDataSource(this.publicationList);
    //   },
    //   error => {
    //     this.notify.showError("error");
    //     console.log(error);
    //   }
    //  );

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(data): void {
    if (data) {
      data["id"] = 1;
    } else {
      data = {
        publicationName: "",
        publicationCode: "",
        publisherName: "",
        publicationType: "",
        status:true,
        id: 0
      }
    }
    const dialogRef = this.dialog.open(PublicationMasterDialog, {
      width: "30%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.publication = result;
      console.log("The dialog was closed", this.publication);
    });
  }

  confirmDialog(status): void {
    let message = "";
    if(status){
      message = "Inactive."
    }else{
      message = "Active."
    }
    this.helperService.confirmDialog('You are about to change the Publication status to '+
       message+' Are you sure you want to do this?', function (data:boolean){
        console.log(data)
    })
  }
}
