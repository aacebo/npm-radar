import { createReducer, on } from '@ngrx/store';

import { INpmPackage } from '../../models';
import * as actions from '../../actions';

export const packages = createReducer<{ [name: string]: INpmPackage }>(
  { },
  on(actions.findOne, (_) => ({ })),
  on(actions.findOneSuccess, (_, a) => {
    return {
      ..._,
      [a.package.name]: a.package,
    };
  }),
  on(actions.findSuccess, (_, a) => {
    const state = { ..._ };

    for (const pkg of a.packages) {
      state[pkg.name] = pkg;
    }

    return state;
  }),
);
