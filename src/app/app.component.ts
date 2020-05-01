import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eshop';
  keyword;
  loggedIn = localStorage.getItem("access_token")?true:false;


  logout():any {

    localStorage.removeItem("access_token");
    window.location.reload();
  }
}


