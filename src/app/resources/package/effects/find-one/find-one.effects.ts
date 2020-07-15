import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import * as actions from '../../actions';
import { PackageHttpService } from '../../services';

@Injectable()
export class FindOneEffects {
  readonly findOne$ = createEffect(() => this._actions$.pipe(
    ofType(actions.findOne),
    switchMap(a =>
      this._packageHttpService.findOne(a.name).pipe(
        switchMap(pkg => {
          const toDispatch: Action[] = [actions.findOneSuccess({ package: pkg })];
          const latest = pkg['dist-tags']['latest'];
          const version = a.version || latest;
          const names = Object.keys(pkg.versions[version]?.dependencies || { });

          if (names.length) {
            toDispatch.push(actions.find({ dependencies: pkg.versions[version].dependencies }));
          }

          return toDispatch;
        }),
        catchError(error => of(actions.findOneFailed({ error }))),
      ),
    ),
  ));

  constructor(
    private readonly _actions$: Actions,
    private readonly _packageHttpService: PackageHttpService,
  ) { }
}
