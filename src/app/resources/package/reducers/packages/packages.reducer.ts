import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { INpmPackage } from '../../models';
import { mapPackage } from '../../utils';

export const packages = createReducer<{ [name: string]: INpmPackage }>(
  { },
  on(actions.findOne, (_) => ({ })),
  on(actions.findOneSuccess, (_, a) => {
    return {
      ..._,
      [a.package.name]: mapPackage(a.package),
    };
  }),
  on(actions.findSuccess, (_, a) => {
    const state = { ..._ };

    for (const pkg of a.packages) {
      state[pkg.name] = mapPackage(pkg);
    }

    return state;
  }),
);
