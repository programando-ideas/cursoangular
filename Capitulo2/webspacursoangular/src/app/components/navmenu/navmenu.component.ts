import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  constructor(
    private secutiryService: SecurityService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  LogOut() {
    this.secutiryService.LogOff();
    this.router.navigate(['/']);
  }

}
