import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './../services/loginservices';
import { ProductService } from './../services/productservice';

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
