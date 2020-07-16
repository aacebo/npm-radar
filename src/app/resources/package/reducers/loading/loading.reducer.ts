import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const loading = createReducer<number>(
  0,
  on(actions.find, actions.findOne, (_) => _ + 1),
  on(actions.findFailed, actions.findSuccess, actions.findComplete, (_) => _ - 1),
  on(actions.findOneFailed, actions.findOneSuccess, (_) => _ - 1),
);
