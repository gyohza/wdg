import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/@shared/models/login.model';
import { Session } from 'src/app/@shared/models/session.model';
import { map } from 'rxjs/operators';

const WDG_TOKEN = 'wdg-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  private _token: string = null;

  performLogin(login: Login): Observable<boolean> {
    return this._http.post<Session>(
      `login`, login
    ).pipe(map(
      ({token}) => !!(this.token = token)
    ));
  }

  performLogout(): void {
    localStorage.removeItem(WDG_TOKEN);
    this._token = null;
    this._router.navigate(['login']);
  }

  set token(token: string) {
    this._token = token;
    localStorage.setItem(WDG_TOKEN, token);
  }

  get isLoggedIn(): boolean {
    return !!(this._token || localStorage.getItem(WDG_TOKEN));
  }
}
