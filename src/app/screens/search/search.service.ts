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
  private readonly _text$ = new BehaviorSubject<string>(undefined);
  private readonly _results$ = new BehaviorSubject<{ [name: string]: INpmSearchPackage }>({ });
  private readonly _error$ = new BehaviorSubject<HttpErrorResponse>(undefined);

  get text$() { return this._text$.asObservable(); }
  get results$() { return this._results$.pipe(map(r => Object.values(r))); }
  get error$() { return this._error$.asObservable(); }

  constructor(private readonly _searchHttpService: SearchHttpService) { }

  find(text: string) {
    this._text$.next(text);

    return this._searchHttpService.find(text).pipe(
      map(results => {
        const _results: { [name: string]: INpmSearchPackage } = { };

        for (const res of results) {
          _results[res.name] = {
            name: res.name,
            version: res.version,
            description: res.description,
          };
        }

        this._results$.next(_results);
        return _results;
      }),
      catchError((error: HttpErrorResponse) => {
        this._error$.next(error);
        return of(error);
      }),
    );
  }
}
