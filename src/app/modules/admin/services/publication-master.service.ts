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

  toggleActivation(publicationCode: string, status: string): Observable<any> {
    return this.httpService.patch(`/publication/activation/${publicationCode}`, { status: status })
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }

  addPublication(publicationDetails: Publication): Observable<any> {
    return this.httpService.post(`/publication`, publicationDetails)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }

  deletePublication(publicationId: number): Observable<any> {
    return this.httpService.delete(`/publication/${publicationId}`)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }

  updatePublication(publicationDetails: Publication): Observable<any> {
    return this.httpService.put(`/publication/${publicationDetails.pki_publication_id}`,publicationDetails)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }

  mapPublication(publicationDetails: Object): Observable<any> {
    return this.httpService.post(`/publication/map`,publicationDetails)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }

}
