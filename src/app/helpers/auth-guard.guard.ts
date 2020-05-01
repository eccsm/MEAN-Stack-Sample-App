import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

declare let alertify;


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    let authStr = localStorage.getItem("access_token");

    let arr = authStr.split("yırtıcı");

    let expireT = Date.parse(arr[1]);

     if (authStr) {

       if (expireT<Date.now()) {

         alertify.error("Your session was ended you need to login!");
         this.router.navigate(['/login'])
         return false;

       }
       else {
         return true
       }


     }
     else {
       alertify.error("You need to login!");
       this.router.navigate(['/login'])
       return false;
     }
     
   }
}
