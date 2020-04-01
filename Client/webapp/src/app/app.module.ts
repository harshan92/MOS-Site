import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { RegistrationComponent } from './registration/registration.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
