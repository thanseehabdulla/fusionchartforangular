//page to set application configuration
import { FormControl } from '@angular/forms';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  indentIncreasePercentage:number;
  indentDecreasePercentage:number;
  indentTypeMapper = {
    "indentIncrease": "I", 
    "indentDecrease": "D"
  };
  constructor(
    private configurationService:ConfigurationService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.setDiv();
    this.getIndents();
  }

  //get Indent Updatipn Percentage
  getIndents(){
    this.configurationService.getIndents().subscribe((data) => {
      let indentIncreasePercentage = _.pickBy(data,(x,i) => { 
        if(x.indent_type == 'I') 
        return x; 
      });
      let indentDecreasePercentage = _.pickBy(data,(x,i) => { 
        if(x.indent_type == 'D') 
        return x; 
      });
      this.indentIncreasePercentage = indentIncreasePercentage[Object.keys(indentIncreasePercentage)[0]].indent;
      this.indentDecreasePercentage = indentDecreasePercentage[Object.keys(indentDecreasePercentage)[0]].indent;
    },(error:any) => { 
      this.setError(error);
    })
  }

  //set all li to hide
  setDiv(){
    document.getElementById('indentIncrease').style.display = 'none';
    document.getElementById('indentDecrease').style.display = 'none';
  }

  //edit Percentage
  editPercentage(id:string){
    document.getElementById(id).style.display = 'flex';
  }

  //cancel pop up
  cancel(id:string){
    document.getElementById(id).style.display = 'none';
  }

  //update % value
  update(id:string, percentage: FormControl){
    let data = {
      "indent" : percentage.value,
      "indent_type" : this.indentTypeMapper[id],
      "fki_user_code" : JSON.parse(localStorage.getItem('currentUser')).user.pki_user_code
    }
    this.configurationService.saveIndent(data).subscribe((percentage:number) => {
      this.getIndents();
    },(error:any) => { 
      this.setError(error);
    });

    this.cancel(id);
  }

  //common function to set error
  setError(error:string){
    console.log(error);
  }

}
