//page to set application configuration

import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  indentUpdatePercentage:number;
  isEdit:boolean;

  constructor(
    private configurationService:ConfigurationService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.getIndentUpdatipnPercentage();
  }

  //get Indent Updatipn Percentage
  getIndentUpdatipnPercentage(){
    // this.configurationService.getIndentUpdatipnPercentage().subscribe((percentage:number) => {
      this.indentUpdatePercentage = 12;
    // },(error:any) => { 
    //   this.setError(error);
    // })
  }

  //edit Percentage
  editPercentage(){
    this.isEdit = true;
  }

  //cancel pop up
  cancel(){
    this.isEdit = false;
  }

  //update % value
  update(){
    let data = {
      "percentage" : this.indentUpdatePercentage
    }

  // this.configurationService.updateIndentUpdatipnPercentage(data).subscribe((percentage:number) => {
    this.indentUpdatePercentage = 18;
  // },(error:any) => { 
  //   this.setError(error);
  // })
    this.cancel();
  }

  //common function to set error
  setError(error:string){
    console.log(error);
  }

}
