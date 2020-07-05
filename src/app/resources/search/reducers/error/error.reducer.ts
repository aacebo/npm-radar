import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const error = createReducer<HttpErrorResponse>(
  undefined,
  on(actions.find, (_) => undefined),
  on(actions.findSuccess, (_) => undefined),
  on(actions.findFailed, (_, a) => a.error),
);
