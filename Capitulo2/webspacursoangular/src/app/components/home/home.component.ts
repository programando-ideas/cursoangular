import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  scrHeight: any;
  scrWidth: any;

  // HostListener: https://angular.io/api/core/HostListener
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  constructor() {
    this.getScreenSize();
  }

  ngOnInit() { }
  ngOnDestroy() { }
}
