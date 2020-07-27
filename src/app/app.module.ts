import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

import { environment } from '../environments/environment';

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
    AngularFireModule.initializeApp(environment.firebase || { }),
    AngularFireAnalyticsModule,

    AppRoutingModule,
    ProgressModule,
  ],
})
export class AppModule { }
