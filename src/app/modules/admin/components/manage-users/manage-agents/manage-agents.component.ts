import { NotifyService } from './../../../../../shared/services/notify.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Agent } from 'src/app/shared/models/agent';
import { ManageAgentsService } from '../../../services/manage-agents.service';

@Component({
  selector: 'app-manage-agents',
  templateUrl: './manage-agents.component.html',
  styleUrls: ['./manage-agents.component.scss']
})
export class ManageAgentsComponent implements OnInit {

  filteredAgents: MatTableDataSource<Agent>;
  columns: string[] = ['pki_agent_code', 'name', 'place', 'mobile', 'status'];
  displayColumns: string[] = ['Agent Code', 'Agent Name', 'Place', 'Mobile Number', 'Status'];
  pageLength: number;
  
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

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private agentService: ManageAgentsService,
    private helperService: HelperService,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    // Initiate data table with agents details and set pagination and sorting
    this.agentService.getAgents().subscribe((agents) => {
      this.filteredAgents = new MatTableDataSource(agents);
      this.pageLength = agents.length;
      this.filteredAgents.sort = this.sort;
      this.filteredAgents.paginator = this.paginator;
    });
  }

  // Filter agents by agent code, name, place and mobile number
  search(searchTerm: string) {
    this.filteredAgents.filterPredicate = (agent: Agent, searchTerm: string) => {
      return agent['pki_agent_code'].trim().toLowerCase().indexOf(searchTerm.trim().toLowerCase())> -1 ||
              agent['name'].trim().toLowerCase().indexOf(searchTerm.trim().toLowerCase())> -1 ||
              agent['place'].trim().toLowerCase().indexOf(searchTerm.trim().toLowerCase())> -1 ||
              agent['mobile'].trim().toLowerCase().indexOf(searchTerm.trim().toLowerCase())> -1 ;
    };
    this.filteredAgents.filter = searchTerm;
    this.filteredAgents.paginator.firstPage();
  }

  // Activate or deactivate an agent
  toggleActivation(agentCode: string, status: string) {
    let message = `Are you sure you want to ${this.statusMessageMapper[status]} the agent (Agent code: ${agentCode}) `
    this.helperService.confirmDialog(message, (isConfirmed) => {
      if (isConfirmed) {
        this.agentService.toggleActivation(agentCode, this.statusChangeMapper[status])
          .subscribe(
            (data: any) => {
              this.agentService.getAgents().subscribe(
                (agents) => this.filteredAgents.data = agents,
                (error) => this.notifyService.showError(error)
              );
              this.notifyService.showSuccess(`Agent(${agentCode}) is ${this.statusResultMapper[status]} successfully!`)
            },
            (error: Error) => this.notifyService.showError(error.message)
          )
      }
    })
  }
}
