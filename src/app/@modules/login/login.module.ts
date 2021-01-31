import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/@modules/login/login.component';
import { AuthService } from 'src/app/@core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
    ]), 
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    AuthService,
  ],
})
export class LoginModule { }
