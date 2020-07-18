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
  private readonly _elements$ = new BehaviorSubject<cytoscape.ElementDefinition[]>([]);
  private readonly _packages$ = new BehaviorSubject<{ [name: string]: INpmPackage }>({ });
  private readonly _loading$ = new BehaviorSubject(false);

  get loading$() { return this._loading$.asObservable(); }
  get elements$() { return this._elements$.asObservable(); }

  constructor(private readonly _packageHttpService: PackageHttpService) { }

  findOne(name: string, version?: string) {
    this._active$.next(name);
    this._loading$.next(true);
    this._packages$.next({ });
    this._elements$.next([ ]);

    return this._packageHttpService.findOne(name).pipe(
      map(pkg => {
        const latest = pkg['dist-tags'].latest;
        const v = version || latest;
        const dependencies = pkg.versions[v]?.dependencies || { };

        this._version$.next(v);

        if (Object.keys(dependencies).length) {
          this._find(dependencies).subscribe(pkgs => {
              const _packages: { [name: string]: INpmPackage } = {
                [pkg.name]: mapPackage(pkg),
                ...pkgs,
              };

              this._packages$.next(_packages);
              this._elements$.next(graphPackage(this._packages$.value[name]?.versions[v], this._packages$.value));
              this._loading$.next(false);
          });
        } else {
          this._packages$.next({ [pkg.name]: mapPackage(pkg) });
          this._elements$.next(graphPackage(this._packages$.value[name]?.versions[v], this._packages$.value));
          this._loading$.next(false);
        }

        return pkg;
      }),
    );
  }

  private _find(deps: { [name: string]: string }) {
    let _found: { [name: string]: INpmPackage } = { };
    const _versions: { [name: string]: string } = { };

    const find = (dependencies: { [name: string]: string }) => {
      const names = Object.keys(dependencies);
      const calls = names.filter(n => !_versions[n] || _versions[n] !== dependencies[n])
                         .map(n => this._packageHttpService.findOne(n));

      return forkJoin(calls).pipe(
        switchMap(async res => {
          for (const pkg of res) {
            _found[pkg.name] = mapPackage(pkg);
            _versions[pkg.name] = dependencies[pkg.name];
            const p = await find(pkg.versions[parseVersion(dependencies[pkg.name])]?.dependencies || { }).toPromise();

            if (p) {
              _found = {
                ..._found,
                ...p,
              };
            }
          }

          return _found;
        }),
      );
    };

    return find(deps);
  }
}
