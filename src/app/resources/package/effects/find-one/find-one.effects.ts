import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as actions from '../../actions/find-one.actions';
import { PackageHttpService } from '../../services';

@Injectable()
export class FindOneEffects {
  readonly findOne$ = createEffect(() => this._actions$.pipe(
    ofType(actions.findOne),
    switchMap(a =>
      this._packageHttpService.findOne(a.name).pipe(
        map(pkg => actions.findOneSuccess({ package: pkg })),
        catchError(error => of(actions.findOneFailed({ error }))),
      ),
    ),
  ));

  constructor(
    private readonly _actions$: Actions,
    private readonly _packageHttpService: PackageHttpService,
  ) { }
}
