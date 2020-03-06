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
  displayColumns: string[] = ['Agent Code', 'Agent Name', 'Place', 'Mobile Number', 'Activate'];
  pageLength: number;
  statusMapper = {
    'A' : 'I',
    'I' : 'A'
  };

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private agentService: ManageAgentsService) { }

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
    this.agentService.toggleActivation(agentCode, this.statusMapper[status])
      .subscribe((data)=> {
        this.agentService.getAgents().subscribe((agents)=> {
          this.filteredAgents.data = agents;
        })
      })   
  }

  
}
