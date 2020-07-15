import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { catchError, withLatestFrom, map, mergeMap } from 'rxjs/operators';

import * as actions from '../../actions/find.actions';
import { PackageHttpService, PackageService } from '../../services';
import { parseVersion } from '../../utils';

const loading: { [name: string]: boolean } = { };

@Injectable()
export class FindEffects {
  readonly find$ = createEffect(() => this._actions$.pipe(
    ofType(actions.find),
    withLatestFrom(this._packageService.state$),
    mergeMap(([a, s]) => {
      const names = Object.keys(a.dependencies);
      const calls = names.filter(n => !(n in loading) && !(n in s.packages)).map(n => {
        loading[n] = true;
        return this._packageHttpService.findOne(n);
      });

      if (!calls.length) {
        return of(actions.findCancelled());
      }

      return forkJoin(calls).pipe(
        map(packages => {
          for (const pkg of packages) {
            delete loading[pkg.name];
            const dependencies = pkg.versions[parseVersion(a.dependencies[pkg.name])]?.dependencies || { };

            if (Object.keys(dependencies).length) {
              this._packageService.find(dependencies);
            }
          }

          return actions.findSuccess({ packages });
        }),
        catchError(error => of(actions.findFailed({ error }))),
      );
    }),
  ));

  constructor(
    private readonly _actions$: Actions,
    private readonly _packageService: PackageService,
    private readonly _packageHttpService: PackageHttpService,
  ) { }
}
