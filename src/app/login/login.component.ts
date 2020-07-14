import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) 
  {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['']
    });
  }

  get f() {return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("submitted");
    //stop here if form is invalid
    if (this.loginForm.invalid){
      return;
    }

    if (this.authService.logIn(this.f.username.value) == true) {
      const redirectUrl = '/dashboard';
      this.router.navigate([redirectUrl]);
    }


  }

  login(username: string) {
    if (this.loginForm.valid) {
      console.log(username);
      //this.auth.sendToken(this.form.value.email)
      //this.myRoute.navigate(["home"]);
      this.authService.logIn(username);
    }
  }
}