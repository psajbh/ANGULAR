import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {
    console.log(`HardcodedAuthenticationService authenticate - username: ${username} password: ${password}`);
    
    if (username === 'John' && password === 'sloop') {
      sessionStorage.setItem(`{$AUTHENTICATED_USER}`, username);
      console.log(`HardcodedAuthenticationService authenticate - ${username} success`);
      return true;
    }
    else {
      console.log(`HardcodedAuthenticationService authenticate - ${username} failure`);
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(`{$AUTHENTICATED_USER}`)
    return !(user === null);
  }

  logout(){
    let user = sessionStorage.getItem(`{$AUTHENTICATED_USER}`)
    sessionStorage.removeItem(`{$AUTHENTICATED_USER}`);
    console.log(`hardcodedAuthenticationService logout - removed authenticated user: ${user}`)

  }

}
