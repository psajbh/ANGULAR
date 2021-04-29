import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication-service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username = '';
  password = '';
  errorMessage = 'invalid credentials';
  invalidLogin = false;

  //making router private seems important. noworky otherwise
  constructor(
    private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService){}

  ngOnInit() {
  }

  handleLogin() {
    console.log(`LoginComponent handleLogin - ${this.username}`)
    if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false;
      console.log(`LoginComponent handleLogin - success for user: ${this.username}`);
    }
    else {
      this.invalidLogin = true;
      console.log(`LoginComponent handleLogin - failure for user: ${this.username}`);
    }
  }

  handleBasicAuthLogin() {
    console.log(`LoginComponent handleBasicAuthLogin - ${this.username}`)
    this.basicAuthenticationService
      .authenticate(this.username, this.password).subscribe(
        data => {
          console.log('LoginComponent handleBasicAuthLogindata - success: ' + data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error => {
          console.log('LoginComponent handleBasicAuthLogindata - failure:' + error);
          this.invalidLogin = true;
        }
      ); 
  }  

}
