import { createReducer, on } from '@ngrx/store';

import { INpmPackage } from '../../models';
import * as actions from '../../actions';

export const packages = createReducer<{ [name: string]: INpmPackage }>(
  { },
  on(actions.findOne, (_, a) => {
    return a.setActive ? { } : _;
  }),
  on(actions.findOneSuccess, (_, a) => {
    return {
      ..._,
      [a.package.name]: a.package,
    };
  }),
);
