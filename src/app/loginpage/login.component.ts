import { LoginService, UserInfo, LoginDetails } from '../services/loginservices';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form;
  userName: UserInfo = {};
  loginDetails: LoginDetails = {};

  constructor(private loginService: LoginService, private cookies: CookieService, private router: Router) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")),
      name: new FormControl(''),
      password: new FormControl(''),
      reenterpassword: new FormControl('')

    })
  }

  login() {

    this.loginService.login(this.loginDetails).then(result => {
      console.log(result)
      if (result.successful) {
        this.cookies.set("userInfo", JSON.stringify(result));
        this.router.navigate(['notes']);
        console.log("Login succesfully")
      } else {
        alert("Username or Password is wrong")
      }

    }).catch(err => {
      alert("Username or Password is wrong")
    }

    )
  }

  onSubmit(values) {
    
    if (values.password !== values.reenterpassword) {
      alert("password and reenter password does not match")
    } else {
      this.userName.name = values.name;
      this.userName.email = values.email;
      this.userName.password = values.password;
      this.loginService.signUp(this.userName).then(result => {
        console.log("created succesfully")
      }).catch(err => {
        alert("something went wrong")
      }

      )
    }


  }
}

