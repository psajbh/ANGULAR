import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BasicAuthenticationService } from './basic-authentication-service';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{
  
  constructor(
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService:  BasicAuthenticationService,
    private router: Router) { }

  //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //if(this.hardcodedAuthenticationService.isUserLoggedIn()){
    if(this.basicAuthenticationService.isUserLoggedIn()){
      console.log("routeGuardService - routing happy path true");
      return true;
    }
    else {
      console.log("routeGuardService not happy routing to login page");
      this.router.navigate(['login']);
      return false;
    }

  }
    
    
   // : Observable<boolean>|Promise<boolean>|boolean {
    //return this.permissions.canActivate(this.currentUser, route.params.id);
    //} 
}

//note: this class prevents any user access when user is not validated.