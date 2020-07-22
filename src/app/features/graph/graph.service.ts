import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SettingsService } from '../settings';
import { INpmPackage } from '../../screens/package';

import { graphPackage } from './graph-package.util';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  get elements$() { return this._elements$.asObservable(); }
  private readonly _elements$ = new BehaviorSubject<cytoscape.ElementDefinition[]>([ ]);

  constructor(private readonly _settingsService: SettingsService) { }

  set(name: string, version: string, max: number, pkgs: { [name: string]: INpmPackage }) {
    this._elements$.next(graphPackage(pkgs[name]?.versions[version], pkgs, max, this._settingsService.get('weightBySize')));
  }
}
