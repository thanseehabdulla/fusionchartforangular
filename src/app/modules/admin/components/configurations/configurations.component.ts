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

  getIndentUpdatipnPercentage(){
    // this.configurationService.getIndentUpdatipnPercentage().subscribe((percentage:number) => {
      this.indentUpdatePercentage = 12;
    // },(error:any) => { 
    //   this.setError(error);
    // })
  }

  editPercentage(){
    this.isEdit = true;
  }

  cancel(){
    this.isEdit = false;
  }

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

  setError(error:string){
    this.notify.showError(error);
  }

}
