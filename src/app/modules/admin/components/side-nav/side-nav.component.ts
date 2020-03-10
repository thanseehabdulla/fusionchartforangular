import { User } from './../../../../shared/models/user';
import { AuthService } from './../../../../shared/services/auth.service';
import { Router } from '@angular/router';
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
    { title: "Report", ref: "/admin/location-report" },   
    { title:"Settings", ref:"/admin/configurations" }
  ];
  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  onLogout() {
    this.authService.logout().subscribe(
      (data) => {
        localStorage.removeItem('currentUser');
        this.authService.currentUserSubject.next(null);
        this.router.navigate(['/user/login']);
      },
      (error) => console.log(error)
    );
  }

}
