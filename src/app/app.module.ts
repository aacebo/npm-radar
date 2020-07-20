import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

import { ProgressModule } from './ui/progress';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

cytoscape.use(fcose);

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    ProgressModule.withHttp(),
  ],
})
export class AppModule { }
