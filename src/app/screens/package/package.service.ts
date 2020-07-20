import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { INpmPackage } from './models';
import { parseVersion, mapPackage, graphPackage } from './utils';
import { PackageHttpService } from './package-http.service';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private readonly _active$ = new BehaviorSubject<string>(undefined);
  private readonly _version$ = new BehaviorSubject<string>(undefined);
  private readonly _elements$ = new BehaviorSubject<cytoscape.ElementDefinition[]>([ ]);
  private readonly _packages$ = new BehaviorSubject<{ [name: string]: INpmPackage }>({ });
  private readonly _loading$ = new BehaviorSubject(false);
  private readonly _weightBySize$ = new BehaviorSubject(true);
  private _max = 0;

  get loading$() { return this._loading$.asObservable(); }
  get elements$() { return this._elements$.asObservable(); }
  get packages$() { return this._packages$.pipe(map(p => Object.values(p))); }

  constructor(private readonly _packageHttpService: PackageHttpService) { }

  findOne(name: string, version?: string) {
    this._active$.next(name);
    this._loading$.next(true);
    this._packages$.next({ });
    this._elements$.next([ ]);
    this._max = 0;

    return this._packageHttpService.findOne(name).pipe(
      map(pkg => {
        const latest = pkg['dist-tags'].latest;
        const v = version || latest;
        const dependencies = pkg.versions[v]?.dependencies || { };
        const size = pkg.versions[v]?.dist.unpackedSize;

        this._version$.next(v);

        if (size > this._max) {
          this._max = size;
        }

        if (Object.keys(dependencies).length) {
          this._find(dependencies).subscribe(pkgs => {
              this._onComplete(name, v, this._weightBySize$.value, {
                [pkg.name]: mapPackage(pkg),
                ...pkgs,
              });
          });
        } else {
          this._onComplete(name, v, this._weightBySize$.value, { [pkg.name]: mapPackage(pkg) });
        }

        return pkg;
      }),
    );
  }

  private _find(deps: { [name: string]: string }) {
    let _packages: { [name: string]: INpmPackage } = { };
    const _versions: { [name: string]: string } = { };

    const find = (dependencies: { [name: string]: string }) => {
      const names = Object.keys(dependencies);
      const calls = names.filter(n => !_versions[n] || _versions[n] !== dependencies[n])
                         .map(n => this._packageHttpService.findOne(n));

      return forkJoin(calls).pipe(
        switchMap(async res => {
          for (const pkg of res) {
            const size = pkg.versions[parseVersion(dependencies[pkg.name])]?.dist.unpackedSize;

            _packages[pkg.name] = mapPackage(pkg);
            _versions[pkg.name] = dependencies[pkg.name];

            if (size > this._max) {
              this._max = size;
            }

            const p = await find(pkg.versions[parseVersion(dependencies[pkg.name])]?.dependencies || { }).toPromise();

            if (p) {
              _packages = {
                ..._packages,
                ...p,
              };
            }
          }

          return _packages;
        }),
      );
    };

    return find(deps);
  }

  private _onComplete(name: string, version: string, weightBySize: boolean, pkgs: { [name: string]: INpmPackage }) {
    this._packages$.next(pkgs);
    this._elements$.next(graphPackage(pkgs[name]?.versions[version], pkgs, this._max, weightBySize));
    this._loading$.next(false);
  }
}
