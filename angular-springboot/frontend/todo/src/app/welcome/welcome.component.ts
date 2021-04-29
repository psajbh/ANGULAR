import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message = 'Welcome to this awsome application.';
  welcomeMessageFromService:string;
  name = '';

  //ActivatedRoute
  constructor(
    private route:ActivatedRoute,
    private service:WelcomeDataService
    ) { }

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage(){
    console.log('getWelcomeMessage');
    // note: subscribe is an asyncronous call returning an Observable
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithParameter(){
    console.log('getWelcomeMessageWithParamter: ' + this.name);
    // note: subscribe is an asyncronous call returning an Observable
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }


  handleSuccessfulResponse(response){
    console.log('handleSuccessfulResponse response: '+response);
    this.welcomeMessageFromService = response.message;
    console.log('handleSuccessfulResponse welcomeMessageFromService: '+response.message);
  }

  handleErrorResponse(error){
    console.log(error.error.message);
    this.welcomeMessageFromService = error.error.message;
  }

}
