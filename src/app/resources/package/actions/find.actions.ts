import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { INpmPackage } from '../models';

export const find = createAction(
  '[PACKAGE] Find',
  props<{ readonly dependencies: { [name: string]: string } }>(),
);

export const findSuccess = createAction(
  '[PACKAGE] FindSuccess',
  props<{ readonly packages: INpmPackage[] }>(),
);

export const findCancelled = createAction(
  '[PACKAGE] FindCancelled',
);

export const findFailed = createAction(
  '[PACKAGE] FindFailed',
  props<{ readonly error: HttpErrorResponse }>(),
);
