import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorScreenComponent } from './@features/error-screen/error-screen.component';
import { LoginComponent } from './@features/login/login.component';
import { AppDefaultComponent } from './@layout/app-default/app-default.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'app',
    component: AppDefaultComponent,
    children: [
      {
        path: 'not-found',
        component: ErrorScreenComponent,
        data: { CODE: 404, MESSAGE: 'Page not found!' }
      },
      {
        path: '**',
        redirectTo: 'not-found'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
