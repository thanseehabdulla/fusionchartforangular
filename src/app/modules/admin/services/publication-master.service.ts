//Service class for publication management

import { apis } from 'src/app/config/api.config';
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


  //get publications
  getPublications(): Observable<Publication[]> {
    return this.httpService.get(apis.publications.publications)
      .pipe(map(response => {
        return response['payload'].publications;
      }))
  }

  //active/deactive publication
  toggleActivation(publicationCode: string, status: string): Observable<any> {
    return this.httpService.patch(`${apis.publications.activate_publication}/${publicationCode}`, { status: status })
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }
  

  //add new publication
  addPublication(publicationDetails: Publication): Observable<any> {
    return this.httpService.post(apis.publications.publications, publicationDetails)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }


  //delete publication
  deletePublication(publicationId: number): Observable<any> {
    return this.httpService.delete(`${apis.publications.publications}/${publicationId}`)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }


  //update publication
  updatePublication(publicationDetails: Publication): Observable<any> {
    return this.httpService.put(`${apis.publications.publications}/${publicationDetails.pki_publication_id}`,publicationDetails)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }


  //publication mapping
  mapPublication(publicationDetails: Object): Observable<any> {
    return this.httpService.post(apis.publications.map_publication, publicationDetails)
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }

}
