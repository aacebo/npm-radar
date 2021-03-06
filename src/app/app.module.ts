import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

import { environment } from '../environments/environment';

import { ProgressModule } from './ui/progress';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

cytoscape.use(fcose);

let firebase = [
  AngularFireModule.initializeApp(environment.firebase || { }),
  AngularFireAnalyticsModule,
];

if (!environment.production) {
  firebase = [];
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ...firebase,

    AppRoutingModule,
    ProgressModule,
  ],
})
export class AppModule { }
