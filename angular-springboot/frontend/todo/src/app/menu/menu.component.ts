import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication-service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //isUserLoggedIn: boolean = false;

  constructor(
    public hardcodedAuthenticationService: HardcodedAuthenticationService,
    public basicAuthenticationService: BasicAuthenticationService
    ) { }

  ngOnInit() {
    //method is only called once on start, so it doesn't work after being initialized.
    //this.isUserLoggedIn = this.hardCodedAuthenticationService.isUserLoggedIn();
  }

}
