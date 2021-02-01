import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-app-default',
  templateUrl: './app-default.component.html',
  styleUrls: ['./app-default.component.scss']
})
export class AppDefaultComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _auth: AuthService
  ) {}

  onLogout() {
    this._auth.performLogout();
  }
}
