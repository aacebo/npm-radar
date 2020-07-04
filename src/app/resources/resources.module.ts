import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    HttpClientModule,

    StoreModule.forRoot({ }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production,
    }),
  ],
})
export class ResourcesModule { }
