import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppDefaultComponent } from './app-default.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    AppDefaultComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    AppDefaultComponent,
  ]
})
export class AppDefaultModule { }
