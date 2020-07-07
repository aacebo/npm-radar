import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

import { ProgressModule } from './ui/progress';
import { ResourcesModule } from './resources';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

cytoscape.use(fcose);

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    ResourcesModule,
    ProgressModule.withHttp(),
  ],
})
export class AppModule { }
