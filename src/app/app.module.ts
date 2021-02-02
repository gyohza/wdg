import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './@features/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './@core/interceptors/api.interceptor';
import { LayoutModule } from '@angular/cdk/layout';
import { ErrorScreenComponent } from './@features/error-screen/error-screen.component';
import { UserModule } from './@features/user/user.module';
import { AppDefaultModule } from './@layout/app-default/app-default.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorScreenComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    LayoutModule,
    UserModule,
    AppDefaultModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
