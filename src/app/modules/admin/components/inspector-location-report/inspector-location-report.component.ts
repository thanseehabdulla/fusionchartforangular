import { LocationTrackingService } from './../../services/location-tracking.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NotifyService } from "src/app/shared/services/notify.service";
import * as _ from 'lodash';
import { Location } from 'src/app/shared/models/location';
import { __assign } from 'tslib';

@Component({
  selector: 'app-inspector-location-report',
  templateUrl: './inspector-location-report.component.html',
  styleUrls: ['./inspector-location-report.component.scss']
})
export class InspectorLocationReportComponent implements OnInit {
  columnList: string[] = ['lat', 'lng', 'place'];
  displayedColumns: string[] = ["Lattitude","Longitude","Place"];
  dataSource: MatTableDataSource<Location>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  locationList:Location[];
  pageLength: number;
  inspectorList:any; 
  selectedInspector:any;
  locationDetails:any;

  constructor(
    private notify: NotifyService,
    private locationTrackingService: LocationTrackingService
  ) {
    this.dataSource = new MatTableDataSource(this.locationList);
  }

  ngOnInit() {
    this.getLocationTrackingList();
  }

  getLocationTrackingList(){
    this.locationTrackingService.getLocationTrackingList().subscribe( (location) => {
      this.locationDetails = location;
      this.inspectorList = _.map(this.locationDetails, function(x) {
        return ({ empCode: x.empcode })
      });
      this.selectedInspector    = this.inspectorList[0];
      this.setDetails();
    },error => { 
      this.setError(error);
    });
  }

  setDetails(){
    let location = _.pickBy(this.locationDetails,(x,i) => { 
      if(x.empcode == this.selectedInspector.empCode) 
      return x; 
    });
    let index = Object.keys(location)[0];
    this.locationList         = location[index].location;
    this.pageLength           = this.locationList.length;
    this.dataSource           = new MatTableDataSource(this.locationList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  setError(error:string){
    this.notify.showError(error);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
