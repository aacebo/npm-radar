import { HttpErrorResponse } from '@angular/common/http';
import { Action, combineReducers } from '@ngrx/store';

import { INpmSearchPackage } from './models';
import * as fromReducers from './reducers';

export interface ISearchState {
  readonly text?: string;
  readonly results: { [name: string]: INpmSearchPackage };
  readonly error?: HttpErrorResponse;
}

export function reducers(state: ISearchState, action: Action) {
  return combineReducers<ISearchState>({
    text: fromReducers.text,
    results: fromReducers.results,
    error: fromReducers.error,
  })(state, action);
}
