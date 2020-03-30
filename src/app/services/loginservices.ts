import { CookieService } from 'ngx-cookie-service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  signUp(userInfo: UserInfo) {
    console.log(userInfo)
    return this.http.post('http://localhost:3000/user', userInfo)
      .toPromise()
      .then(res => { return res; });
  }

  login(loginDetails: LoginDetails) {

    return this.http.post('http://localhost:3000/user/login', loginDetails)
      .toPromise()
      .then(res => {
        return <AccessToken>res;
      });
  }
}

export interface UserInfo {
  name?: string,
  email?: string,
  password?: string
}

export interface LoginDetails {
  email?: string,
  password?: string

}

export interface AccessToken {
  userId?: string,
  successful?: boolean,
  message?: string
}