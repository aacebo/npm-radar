import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { INpmSearchPackage } from '../models';

export const find = createAction(
  '[SEARCH] Find',
  props<{ readonly text: string }>(),
);

export const findSuccess = createAction(
  '[SEARCH] FindSuccess',
  props<{ readonly results: INpmSearchPackage[] }>(),
);

export const findFailed = createAction(
  '[SEARCH] FindFailed',
  props<{ readonly error: HttpErrorResponse }>(),
);
