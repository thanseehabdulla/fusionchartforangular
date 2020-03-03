import { Injectable } from '@angular/core';
import { HttpConnectionService } from 'src/app/shared/services/http-connection.service';
import { Observable } from 'rxjs';
import { Publication } from 'src/app/shared/models/publication';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicationMasterService {

  constructor(private httpService: HttpConnectionService) { }

  getPublications(): Observable<Publication[]> {
    return this.httpService.get('/publication')
      .pipe(map(response => {
        return response['payload'].publications;
      }))
  }
}
