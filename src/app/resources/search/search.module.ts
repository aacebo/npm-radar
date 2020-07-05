import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './search.state';
import * as effects from './effects';

@NgModule({
  imports: [
    StoreModule.forFeature('search', reducers),
    EffectsModule.forFeature([
      effects.FindEffects,
    ]),
  ],
})
export class SearchModule { }
