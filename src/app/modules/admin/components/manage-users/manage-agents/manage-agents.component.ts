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
  statusMapper = {
    'A': 'I',
    'I': 'A'
  };
  statusMessageMapper = {
    'A': 'deactivate',
    'I': 'activate'
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private agentService: ManageAgentsService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.agentService.getAgents().subscribe((agents) => {
      this.filteredAgents = new MatTableDataSource(agents);
      this.pageLength = agents.length;
      this.filteredAgents.sort = this.sort;
      this.filteredAgents.paginator = this.paginator;
    });
  }
  search(searchTerm: string) {
    this.filteredAgents.filter = searchTerm;
  }

  toggleActivation(agentCode: string, status: string) {
    let message = `Are you sure you want to ${this.statusMessageMapper[status]} the agent (Agent code: ${agentCode}) `
    this.helperService.confirmDialog(message, (isConfirmed) => {
      if (isConfirmed) {
        this.agentService.toggleActivation(agentCode, this.statusMapper[status])
          .subscribe(
            (data) => {
              this.agentService.getAgents().subscribe(
                (agents) => this.filteredAgents.data = agents,
                (error) => console.log(error)
              )
            },
            (error) => console.log(error)
          )
      }
    })


  }


}
