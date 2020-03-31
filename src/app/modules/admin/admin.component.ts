import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
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
