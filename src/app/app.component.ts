import { Component } from '@angular/core';
import { AuthService } from './@core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wdg-ng';
  
  constructor(private _auth: AuthService) {
    _auth.performLogin({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    }).subscribe(res => {
      console.log(res);
      console.log(_auth.isLoggedIn());
    }, console.error);
    console.log(_auth.isLoggedIn());
  }
}
