import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { INpmPackage } from '../models';

export const findOne = createAction(
  '[PACKAGE] FindOne',
  props<{ readonly name: string; readonly version?: string; }>(),
);

export const findOneSuccess = createAction(
  '[PACKAGE] FindOneSuccess',
  props<{ readonly package: INpmPackage }>(),
);

export const findOneFailed = createAction(
  '[PACKAGE] FindOneFailed',
  props<{ readonly error: HttpErrorResponse }>(),
);
