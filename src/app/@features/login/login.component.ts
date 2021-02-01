import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginError: string = null;
  
  public loginForm = this._fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this._auth.performLogin({email, password}).subscribe(
      res => this._router.navigate(['/app/home']),
      ({error: {error}}) => this.loginError = error
    );
  }
}
