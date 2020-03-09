import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-manage-publications',
  templateUrl: './manage-publications.component.html',
  styleUrls: ['./manage-publications.component.scss']
})
export class ManagePublicationsComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit() {
    this.router.navigate(['/admin/publications/master']); 
  }

  onTabChange(event: MatTabChangeEvent) {
    if(event.index == 0){
      this.router.navigate(['/admin/publications/master']); 
    }else if(event.index == 1){
      this.router.navigate(['/admin/publications/mapping']); 
    }
  }

}
