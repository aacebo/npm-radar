import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const version = createReducer<string>(
  undefined,
  on(actions.findOne, (_, a) => a.version ? a.version : undefined),
);
