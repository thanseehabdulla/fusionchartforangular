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
  getIndents(): Observable<any> {
    return this.httpService.get(apis.configurations.get_indents)
      .pipe(map(response => {
        return response['payload'].indent;
    }))
  }

  //update indent updation %
  saveIndent(indentDetails): Observable<any> {
    return this.httpService.post(apis.configurations.get_indents, indentDetails)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }
}
