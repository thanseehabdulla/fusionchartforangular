import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { HttpConnectionService } from "src/app/shared/services/http-connection.service";
import { NotifyService } from "src/app/shared/services/notify.service";
import { MatDialog } from "@angular/material/dialog";
import { PublicationMasterDialog } from "../publication-master-dialog/publication-master-dialog";
import { HelperService } from 'src/app/shared/services/helper.service';
import { PublicationMasterService } from '../../../services/publication-master.service';

export interface PublicationData {
  publication_name: string;
  publication_code: string;
  publisher_name: string;
  publication_type: string;
  status: boolean
}

@Component({
  selector: "app-publication-master",
  templateUrl: "./publication-master.component.html",
  styleUrls: ["./publication-master.component.scss"]
})
export class PublicationMasterComponent implements OnInit {
  displayedColumns: string[] = [
    "publication_name",
    "publication_code",
    "publisher_name",
    "publication_type",
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
    public helperService: HelperService,
    private publicationService: PublicationMasterService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.publicationList);
  }

  ngOnInit() {
    this.publicationService.getPublications().subscribe(
      publications => {
        this.publicationList = publications;
        this.dataSource = new MatTableDataSource(this.publicationList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.notify.showError("error");
        console.log(error);
      }
    );
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
        publication_name: "",
        publication_code: "",
        publisher_name: "",
        publication_type: "",
        status: true,
        id: 0
      };
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
    if (status) {
      message = "Inactive.";
    } else {
      message = "Active.";
    }
    this.helperService.confirmDialog(
      "You are about to change the Publication status to " +
        message +
        " Are you sure you want to do this?",
      function(data: boolean) {
        console.log(data);
      }
    );
  }
}
