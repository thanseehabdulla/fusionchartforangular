import { map } from 'rxjs/operators';
import { HttpConnectionService } from './../../../shared/services/http-connection.service';
import { Injectable } from '@angular/core';
import { Agent } from 'src/app/shared/models/agent';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageAgentsService {

  constructor(private httpService: HttpConnectionService) { }

  // GET: get all Agents
  getAgents(): Observable<Agent[]> {
    return this.httpService.get('/agent')
      .pipe(map(response => {
        return response['payload'].agents;
      }))
  }

  // PATCH: Activate or Deactivate an agent
  toggleActivation(agentCode: string, status: string): Observable<any> {
    return this.httpService.patch(`/agent/activation/${agentCode}`, { status: status })
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }
}