import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, of, forkJoin } from 'rxjs';
import { catchError, map, withLatestFrom } from 'rxjs/operators';

import { INpmPackage } from './models';
import { parseVersion, mapPackage, graphPackage } from './utils';
import { PackageHttpService } from './package-http.service';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private readonly _active$ = new BehaviorSubject<string>(undefined);
  private readonly _version$ = new BehaviorSubject<string>(undefined);
  private readonly _packages$ = new BehaviorSubject<{ [name: string]: INpmPackage }>({ });
  private readonly _error$ = new BehaviorSubject<HttpErrorResponse>(undefined);
  private readonly _loading$ = new BehaviorSubject(false);

  get loading$() { return this._loading$.asObservable(); }
  get elements$() {
    return this._packages$.pipe(
      withLatestFrom(this._active$),
      withLatestFrom(this._version$),
      map(([[pkgs, active], version]) => {
        const v = version || pkgs[active]['dist-tags'].latest;

        if (!pkgs[active]) {
          return;
        }

        return graphPackage(pkgs[active]?.versions[v], pkgs);
      }),
    );
  }

  constructor(private readonly _packageHttpService: PackageHttpService) { }

  findOne(name: string, version?: string) {
    this._active$.next(name);
    this._loading$.next(true);

    return this._packageHttpService.findOne(name).pipe(
      map(pkg => {
        const latest = pkg['dist-tags'].latest;
        const v = version || latest;
        const dependencies = pkg.versions[v]?.dependencies || { };

        this._version$.next(v);

        if (Object.keys(dependencies).length) {
          this._find(dependencies).subscribe((pkgs) => {
            if (!(pkgs instanceof HttpErrorResponse)) {
              const _packages: { [name: string]: INpmPackage } = { [pkg.name]: mapPackage(pkg) };

              for (const p of pkgs) {
                _packages[p.name] = mapPackage(p);
              }

              this._packages$.next(_packages);
              this._loading$.next(false);
            }
          });
        }

        return pkg;
      }),
      catchError((error: HttpErrorResponse) => {
        this._error$.next(error);
        this._loading$.next(false);
        return of(error);
      }),
    );
  }

  private _find(deps: { [name: string]: string }) {
    let pkgs: INpmPackage[] = [];

    const find = (dependencies: { [name: string]: string }) => {
      const names = Object.keys(dependencies);
      const calls = names.map(n => this._packageHttpService.findOne(n));

      return forkJoin(calls).pipe(
        map(res => {
          pkgs = [...pkgs, ...res];

          for (const pkg of res) {
            find(pkg.versions[parseVersion(dependencies[pkg.name])]?.dependencies || { }).subscribe();
          }

          return pkgs;
        }),
        catchError((error: HttpErrorResponse) => {
          this._error$.next(error);
          return of(error);
        }),
      );
    };

    return find(deps);
  }
}
