import { AuthService } from './../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }
  sideMenuItems = [
    {title:"Manage users", ref:"/admin/users" },
    {title:"Manage Publications", ref:"/admin/publications" },
    {title:"Report", ref:"/admin/location-report" },
    {title:"Settings", ref:"/admin/configurations" },
  ]
  
  ngOnInit() {
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }

}
