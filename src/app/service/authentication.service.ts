import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from "../model/user";
import { ApiService } from "./api.service";
import { JwtHelperService} from "@auth0/angular-jwt";
declare let alertify;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  baseUri: string = 'http://localhost:4000/api';
  user: User[];
  currentUser = {};
  constructor(private http: HttpClient, private apiService: ApiService, private router: Router, private ngZone: NgZone, public jwtHelper: JwtHelperService) { }

  jwtOptionsFactory(tokenService) {
    return {
      tokenGetter: () => {
        return tokenService.getAsyncToken();
      }
    }
  }
  login(user: User) {
    return this.http.post<{ access_token: string }>(this.baseUri + "/user/login", user)
      .subscribe((res: any) => {

        localStorage.setItem('access_token', res.token)
        this.apiService.getUser(res.data._id).subscribe((res) => {
          this.currentUser = res.data;
          this.router.navigate(["/products"]);
          alertify.success("Welcome "+this.getDecoded().data.name)
        })
      })

  }
  getDecoded() {
    return {
      data :this.jwtHelper.decodeToken(this.getAccessToken())
    }
  }
  getAccessToken() {

    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
}