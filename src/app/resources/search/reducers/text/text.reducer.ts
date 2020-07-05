import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const text = createReducer<string>(
  undefined,
  on(actions.find, (_, a) => a.text),
);
