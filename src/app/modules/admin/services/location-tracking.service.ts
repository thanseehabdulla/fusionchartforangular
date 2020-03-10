import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpConnectionService } from 'src/app/shared/services/http-connection.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationTrackingService {

  constructor(private httpService: HttpConnectionService) { }

  getLocationTrackingList(): Observable<any> {
    return this.httpService.get('/report')
      .pipe(map(response => {
        return response['payload'].report;
      }))
  }
}
