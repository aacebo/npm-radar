import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as actions from '../../actions/find.actions';
import { SearchHttpService } from '../../services';

@Injectable()
export class FindEffects {
  readonly find$ = createEffect(() => this._actions$.pipe(
    ofType(actions.find),
    switchMap(a =>
      this._searchHttpService.find(a.text).pipe(
        map(results => actions.findSuccess({ results })),
        catchError(error => of(actions.findFailed({ error }))),
      ),
    ),
  ));

  constructor(
    private readonly _actions$: Actions,
    private readonly _searchHttpService: SearchHttpService,
  ) { }
}
