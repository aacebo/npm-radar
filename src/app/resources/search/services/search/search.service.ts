import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ISearchState } from '../../search.state';
import { INpmSearchPackage } from '../../models';
import * as selectors from '../../search.selectors';
import * as actions from '../../actions';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly state$: Observable<ISearchState>;
  readonly text$: Observable<string>;
  readonly error$: Observable<HttpErrorResponse>;
  readonly results$: Observable<{ [name: string]: INpmSearchPackage }>;
  readonly entities$: Observable<INpmSearchPackage[]>;

  constructor(private readonly _store$: Store<ISearchState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.text$ = this._store$.pipe(select(selectors.selectText));
    this.error$ = this._store$.pipe(select(selectors.selectError));
    this.results$ = this._store$.pipe(select(selectors.selectResults));
    this.entities$ = this._store$.pipe(select(selectors.selectEntities));
  }

  find(text: string) {
    this._store$.dispatch(actions.find({ text }));
  }
}
