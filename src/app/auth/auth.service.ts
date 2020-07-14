import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookiesService } from '../cookies.service';
import { stringify } from 'querystring';

@Injectable()
export class AuthService {
  //Change to false when finishing authentication
  //loggedIn: boolean = false;
  loggedIn: boolean = true;
  constructor(private route: Router, private cookiesService: CookiesService)
  { }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }

  getToken() {
    return localStorage.getItem("LoggedInUser")
  }

  logIn(username: string) : boolean{
    let cookie : string;
    cookie = this.cookiesService.getCookie("CICCred");
    console.log(cookie);
    this.loggedIn = true;

    return true;
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    this.loggedIn = false;
    console.log("logging out");
    localStorage.removeItem("LoggedInUser");
    this.route.navigate(["login"]);
  }
}