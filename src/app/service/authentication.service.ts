import { Injectable,NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from "../model/user";
import { ApiService } from "./api.service";
import { user } from "models/user";
declare let alertify;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  baseUri: string = 'http://localhost:4000/api';
  user: User[];
  currentUser = {};
  constructor(private http: HttpClient, private apiService: ApiService,private router: Router,private ngZone: NgZone) { }


  login(user:User) {
    return this.http.post<any>(this.baseUri +"/user/login", user)
      .subscribe((res: any) => {
        
        localStorage.setItem('access_token', res.token)
        this.apiService.getUser(res.data._id).subscribe((res) => {
          this.currentUser = res.data;
          this.router.navigate(["/products"]);
          alertify.success("Welcome")
        })
      })
    }

    getAccessToken() {
      return localStorage.getItem('access_token');
    }

    isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return (authToken !== null) ? true : false;
    }  

}