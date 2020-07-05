import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './package.state';
import * as effects from './effects';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('package', reducers),
    EffectsModule.forFeature([
      effects.FindOneEffects,
    ]),
  ],
})
export class PackageModule { }
