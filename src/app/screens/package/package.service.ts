import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { parseVersion } from '../../core/utils';
import { GraphService } from '../../features/graph';

import { INpmPackage } from './models';
import { mapPackage } from './utils';
import { PackageHttpService } from './package-http.service';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private readonly _name$ = new BehaviorSubject<string>(undefined);
  private readonly _version$ = new BehaviorSubject<string>(undefined);
  private readonly _packages$ = new BehaviorSubject<{ [name: string]: INpmPackage }>({ });

  get packages$() { return this._packages$.pipe(map(p => Object.values(p))); }

  constructor(
    private readonly _graphService: GraphService,
    private readonly _packageHttpService: PackageHttpService,
  ) { }

  findOne(name: string, version?: string) {
    this._name$.next(name);
    this._graphService.reset();

    return this._packageHttpService.findOne(name).pipe(
      tap(pkg => {
        const latest = pkg['dist-tags'].latest;
        const v = version || latest;
        const dependencies = pkg.versions[v]?.dependencies || { };

        this._version$.next(v);
        this._onPackageLoad(pkg, v);

        if (Object.keys(dependencies).length) {
          this._find(dependencies).subscribe();
        }
      }),
    );
  }

  private _find(deps: { [name: string]: string }) {
    const _versions: { [name: string]: string } = { };

    const find = (dependencies: { [name: string]: string }) => {
      const names = Object.keys(dependencies);
      const calls = names.filter(n => !_versions[n] || _versions[n] !== dependencies[n])
                         .map(n => this._packageHttpService.findOne(n));

      return forkJoin(calls).pipe(
        tap(async res => {
          for (const pkg of res) {
            const pkgVersion = this._onPackageLoad(pkg, dependencies[pkg.name]);
            _versions[pkg.name] = dependencies[pkg.name];

            await find(pkgVersion?.dependencies || { }).toPromise();
          }
        }),
      );
    };

    return find(deps);
  }

  private _onPackageLoad(pkg: INpmPackage, v: string) {
    const version = pkg.versions[parseVersion(v)];

    this._packages$.next({
      ...this._packages$.value,
      [pkg.name]: mapPackage(pkg),
    });

    if (version) {
      this._graphService.add(version, this._packages$.value);
    }

    return version;
  }
}
