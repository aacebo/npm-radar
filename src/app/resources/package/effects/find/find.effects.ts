import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { catchError, withLatestFrom, map, mergeMap } from 'rxjs/operators';

import * as actions from '../../actions/find.actions';
import { PackageHttpService, PackageService } from '../../services';
import { parseVersion } from '../../utils';
import { INpmPackage } from '../../models';

@Injectable()
export class FindEffects {
  private readonly _loading: { [name: string]: boolean } = { };
  private _packages: INpmPackage[] = [];

  readonly find$ = createEffect(() => this._actions$.pipe(
    ofType(actions.find),
    withLatestFrom(this._packageService.state$),
    mergeMap(([a, s]) => {
      const names = Object.keys(a.dependencies);
      const calls = names.filter(n => !(n in this._loading) && !(n in s.packages)).map(n => {
        this._loading[n] = true;
        return this._packageHttpService.findOne(n);
      });

      if (!calls.length) {
        const packages = this._packages.slice();
        this._packages = [];
        return of(actions.findComplete({ packages }));
      }

      return forkJoin(calls).pipe(
        map(packages => {
          this._packages = [...this._packages, ...packages];

          for (const pkg of packages) {
            delete this._loading[pkg.name];
            const dependencies = pkg.versions[parseVersion(a.dependencies[pkg.name])]?.dependencies || { };

            if (Object.keys(dependencies).length) {
              this._packageService.find(dependencies);
            }
          }

          return actions.findSuccess();
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
