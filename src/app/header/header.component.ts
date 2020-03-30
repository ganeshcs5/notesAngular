import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private cookiesServce: CookieService, private router: Router) {

  }
  logout() {
    this.cookiesServce.deleteAll();
  }
}
