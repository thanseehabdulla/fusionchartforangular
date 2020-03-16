//service class for cofigurations

import { apis } from 'src/app/config/api.config';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConnectionService } from 'src/app/shared/services/http-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private httpService: HttpConnectionService) { }
  

  //get indent updation %
  getIndentUpdatipnPercentage(): Observable<number> {
    return this.httpService.get(apis.configurations.indent_update_percentage)
      .pipe(map(response => {
        return response['payload'].indentUpdatePercentage;
    }))
  }

  //update indent updation %
  updateIndentUpdatipnPercentage(percentage): Observable<any> {
    return this.httpService.put(apis.publications.publications, percentage)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }
}
