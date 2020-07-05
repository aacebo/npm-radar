import { createReducer, on } from '@ngrx/store';

import { INpmSearchPackage } from '../../models';
import * as actions from '../../actions';

export const results = createReducer<{ [name: string]: INpmSearchPackage }>(
  { },
  on(actions.findFailed, (_) => undefined),
  on(actions.findSuccess, (_, a) => {
    const res: { [name: string]: INpmSearchPackage } = { };

    for (const result of a.results) {
      res[result.name] = result;
    }

    return res;
  }),
);
