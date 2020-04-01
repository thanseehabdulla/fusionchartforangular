// Page to manage agent details

import { NotifyService } from './../../../../../shared/services/notify.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Agent } from 'src/app/shared/models/agent';
import { ManageAgentsService } from '../../../services/manage-agents.service';

@Component({
  selector: 'app-manage-agents',
  templateUrl: './manage-agents.component.html',
  styleUrls: ['./manage-agents.component.scss']
})
export class ManageAgentsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('searchBox', { static: true }) searchBox: ElementRef;
  allAgents: MatTableDataSource<Agent> = new MatTableDataSource([]);
  filteredAgents: MatTableDataSource<Agent> = new MatTableDataSource([]);
  columns: string[] = ['pki_agent_code', 'name', 'place', 'mobile', 'status'];
  displayColumns: string[] = ['Agent Code', 'Agent Name', 'Place', 'Mobile Number', 'Status'];
  pageLength: number = 0;

  statusChangeMapper = {
    'A': 'I',
    'I': 'A'
  }
  statusMessageMapper = {
    'A': 'deactivate',
    'I': 'activate'
  }
  statusResultMapper = {
    'I': 'activated',
    'A': 'deactivated'
  }

  constructor(
    private agentService: ManageAgentsService,
    private helperService: HelperService,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    // Initiate data table with agents details and set pagination and sorting
    this.agentService.getAgents().subscribe((agents) => {
      this.allAgents = new MatTableDataSource(agents);
      this.filteredAgents = new MatTableDataSource(agents);
      this.pageLength = agents.length;
      this.filteredAgents.sort = this.sort;
      this.filteredAgents.paginator = this.paginator;
    });
  }

  // Filter agents by agent code, name, place and mobile number
  search() {
    let searchTerm: string = this.searchBox.nativeElement.value.trim().toLowerCase();
    if (this.allAgents.data.length) {
      this.filteredAgents.filterPredicate = (agent: Agent, searchTerm: string) => {
        return (agent['pki_agent_code'].trim().toLowerCase().indexOf(searchTerm) > -1 ||
          agent['name'].trim().toLowerCase().indexOf(searchTerm) > -1 ||
          agent['place'].trim().toLowerCase().indexOf(searchTerm) > -1 ||
          agent['mobile'].trim().toLowerCase().indexOf(searchTerm) > -1);
      };
      this.filteredAgents.filter = searchTerm;
      this.filteredAgents.paginator.firstPage();
    }
  }

  // Activate or deactivate an agent
  toggleActivation(agentCode: string, status: string) {
    let message = `Are you sure you want to ${this.statusMessageMapper[status]} the agent (Agent code: ${agentCode}) `
    this.helperService.confirmDialog(message, (isConfirmed) => {
      if (isConfirmed) {
        this.agentService.toggleActivation(agentCode, this.statusChangeMapper[status])
          .subscribe(
            (data: any) => {
              this.agentService.getAgents().subscribe((agents) => {
                this.allAgents.data = agents;
                this.filteredAgents.data = agents;
              });
              this.notifyService.showSuccess(`Agent(${agentCode}) is ${this.statusResultMapper[status]} successfully!`)
            }
          )
      }
    })
  }
}
