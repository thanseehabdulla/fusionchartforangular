// page to display side nav

import { User } from './../../../../shared/models/user';
import { AuthService } from './../../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent implements OnInit {
  currentUser: User;
  sideMenuItems = [
    { title: "Manage Users", ref: "/admin/users" },
    { title: "Manage Publications", ref: "/admin/publications" },
    { title: "Inspector Location Report", ref: "/admin/location-report" },   
    { title:"Settings", ref:"/admin/configurations" },
    { title: "Change Password", ref: "/user/change-password" }
  ];
  constructor(
    private authService: AuthService
    ) { }


  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  onLogout() {
    this.authService.logout();
  }
}
