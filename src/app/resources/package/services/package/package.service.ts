import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import cytoscape from 'cytoscape';

import { IPackageState } from '../../package.state';
import { INpmPackage, INpmPackageVersion } from '../../models';
import * as selectors from '../../package.selectors';
import * as actions from '../../actions';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  readonly state$: Observable<IPackageState>;
  readonly active$: Observable<string>;
  readonly packages$: Observable<{ [name: string]: INpmPackage }>;
  readonly package$: Observable<INpmPackage>;
  readonly latestVersion$: Observable<INpmPackageVersion>;
  readonly dependencies$: Observable<cytoscape.ElementDefinition[]>;
  readonly error$: Observable<HttpErrorResponse>;

  constructor(private readonly _store$: Store<IPackageState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.active$ = this._store$.pipe(select(selectors.selectActive));
    this.packages$ = this._store$.pipe(select(selectors.selectPackages));
    this.package$ = this._store$.pipe(select(selectors.selectPackage));
    this.latestVersion$ = this._store$.pipe(select(selectors.selectLatestVersion));
    this.dependencies$ = this._store$.pipe(select(selectors.selectDependencies));
    this.error$ = this._store$.pipe(select(selectors.selectError));
  }

  findOne(name: string, setActive?: boolean) {
    this._store$.dispatch(actions.findOne({ name, setActive }));
  }
}
