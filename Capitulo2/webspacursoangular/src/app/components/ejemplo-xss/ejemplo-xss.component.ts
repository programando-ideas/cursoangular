import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ejemplo-xss',
  templateUrl: './ejemplo-xss.component.html'
})
export class EjemploXSSComponent implements OnInit {
  htmlSnippet = 'Código inyectado <script>alert("hola");</script>';
  dangerousUrl: any;
  trustedUrl: any;
  dangerousVideoUrl: any;
  videoUrl: any;

  constructor(private sanitizer: DomSanitizer) {
    this.dangerousUrl = 'javascript:alert("hola")';
    this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);

    this.dangerousVideoUrl = 'https://www.youtube.com/embed/FyZ5E80Oyd8';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }

  ngOnInit() {
  }

}
