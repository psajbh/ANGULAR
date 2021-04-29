import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication-service';
import { API_URL } from 'src/app/app.constants';


@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient,
    //private basicAuthenticationService: BasicAuthenticationService

  ) { }

  executeHelloWorldBeanService() {
    console.log('executeHellowWorldService')
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`);
  }

  executeHelloWorldBeanServiceWithPathVariable(name) {
    console.log('executeHelloWorldBeanServiceWithPathVariable - name: ' +name);

    
    //let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    //  let headers = new HttpHeaders({
    //     Authorization: basicAuthHeaderString
    //  })

    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean/path-variable/${name}`);
    
  }

  //note basic authentiation encoding provided by system using window.btoa(...)  windows base 64 encoding
  //  createBasicAuthenticationHttpHeader(){
  //   console.log('createBasicAuthenticationHttpHeader');
  //    let username = 'John';
  //    let password = 'sloop';
  //    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //    return basicAuthHeaderString;
  //  }

}

export class HelloWorldBean {
  constructor(public message: string) { }

}

