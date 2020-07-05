import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const error = createReducer<HttpErrorResponse>(
  undefined,
  on(actions.findOne, (_) => undefined),
  on(actions.findOneFailed, (_, a) => a.error),
);
