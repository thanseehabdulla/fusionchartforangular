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
    { title: "Manage users", ref: "/admin/users" },
    { title: "Manage Publications", ref: "/admin/publications" },
    { title: "Change Password", ref: "/user/change-password" },
    { title: "Report", ref: "/admin/location-report" },   
    { title:"Settings", ref:"/admin/configurations" }
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
