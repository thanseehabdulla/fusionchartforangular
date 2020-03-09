import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConnectionService } from 'src/app/shared/services/http-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private httpService: HttpConnectionService) { }
  
  getIndentUpdatipnPercentage(): Observable<number> {
    return this.httpService.get('/indentUpdatePercentage')
      .pipe(map(response => {
        return response['payload'].indentUpdatePercentage;
    }))
  }
  updateIndentUpdatipnPercentage(percentage): Observable<any> {
    return this.httpService.put(`/publication`,percentage)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }
}
