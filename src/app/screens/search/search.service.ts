import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { INpmSearchPackage } from './models';
import { SearchHttpService } from './search-http.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  get text$() { return this._text$.asObservable(); }
  private readonly _text$ = new BehaviorSubject<string>(undefined);

  get results$() { return this._results$.pipe(map(r => Object.values(r))); }
  private readonly _results$ = new BehaviorSubject<{ [name: string]: INpmSearchPackage }>({ });

  get error$() { return this._error$.asObservable(); }
  private readonly _error$ = new BehaviorSubject<HttpErrorResponse>(undefined);

  get complete$() { return this._complete$.asObservable(); }
  private readonly _complete$ = new BehaviorSubject<boolean>(true);

  constructor(private readonly _searchHttpService: SearchHttpService) { }

  find(text: string) {
    this._text$.next(text);
    this._complete$.next(false);
    this._error$.next(undefined);

    return this._searchHttpService.find(text).pipe(
      map(results => {
        const _results: { [name: string]: INpmSearchPackage } = { };

        for (const res of results) {
          _results[res.name] = {
            name: res.name,
            safeName: encodeURIComponent(res.name),
            version: res.version,
            description: res.description,
          };
        }

        this._results$.next(_results);
        this._complete$.next(true);
        return _results;
      }),
      catchError((error: HttpErrorResponse) => {
        this._error$.next(error);
        this._complete$.next(true);
        return of(error);
      }),
    ).subscribe();
  }
}
