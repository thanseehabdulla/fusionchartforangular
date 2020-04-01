//Page to set application configuration
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

  indentIncreasePercentage: number;
  indentDecreasePercentage: number;
  isEditIndentIncrease: boolean = false;
  isEditIndentDecrease: boolean = false;

  indentTypeMapper = {
    "indentIncrease": "I",
    "indentDecrease": "D"
  };
  constructor(
    private configurationService: ConfigurationService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.getIndents();
  }

  //get Indent Updatipn Percentage
  getIndents() {
    this.configurationService.getIndents().subscribe(
      (data) => {
        let indentIncreasePercentage = _.pickBy(data, (x, i) => {
          if (x.indent_type == 'I')
            return x;
        });
        let indentDecreasePercentage = _.pickBy(data, (x, i) => {
          if (x.indent_type == 'D')
            return x;
        });
        if (indentIncreasePercentage) {
          this.indentIncreasePercentage = indentIncreasePercentage[Object.keys(indentIncreasePercentage)[0]]?
          indentIncreasePercentage[Object.keys(indentIncreasePercentage)[0]].indent: 0;
        }
        if (indentDecreasePercentage) {
          this.indentDecreasePercentage = indentDecreasePercentage[Object.keys(indentDecreasePercentage)[0]]?
          indentDecreasePercentage[Object.keys(indentDecreasePercentage)[0]].indent: 0;
        }
      });
  }

  //update % value
  update(id: string, percentage: FormControl) {
    let data = {
      "indent": percentage.value,
      "indent_type": this.indentTypeMapper[id],
      "fki_user_code": JSON.parse(localStorage.getItem('currentUser')).user.pki_user_code
    }
    this.configurationService.saveIndent(data).subscribe((percentage: number) => {
      this.getIndents();
      data.indent_type === 'I' ? this.isEditIndentIncrease = false : this.isEditIndentDecrease = false;
    });
  }
}
