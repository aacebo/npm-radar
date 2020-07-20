import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ISettings } from './settings.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  get settings$() { return this._settings$.asObservable(); }
  private readonly _settings$ = new BehaviorSubject<ISettings>({
    weightBySize: true,
  });

  get(k: keyof ISettings) {
    return this._settings$.value[k];
  }

  set<K extends keyof ISettings, V extends ISettings[K]>(k: K, v: V) {
    this._settings$.next({
      ...this._settings$.value,
      [k]: v,
    });
  }
}
