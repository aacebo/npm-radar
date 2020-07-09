import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const active = createReducer<string>(
  undefined,
  on(actions.findOne, (_, a) => a.setActive ? a.name : _),
);
