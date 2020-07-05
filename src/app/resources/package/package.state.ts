import { HttpErrorResponse } from '@angular/common/http';
import { Action, combineReducers } from '@ngrx/store';

import { INpmPackage } from './models';
import * as fromReducers from './reducers';

export interface IPackageState {
  readonly active: string;
  readonly packages: { [name: string]: INpmPackage; };
  readonly error?: HttpErrorResponse;
}

export function reducers(state: IPackageState, action: Action) {
  return combineReducers<IPackageState>({
    active: fromReducers.active,
    packages: fromReducers.packages,
    error: fromReducers.error,
  })(state, action);
}
