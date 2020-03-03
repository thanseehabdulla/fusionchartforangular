import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  userTypes: string[];

  constructor(private router: Router) { 
    this.userTypes = ['Agent', 'Admin/Inspector'];
   }

  ngOnInit() {
  }
}
