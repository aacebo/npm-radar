import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { INpmSearchPackage } from './models';

@Injectable({
  providedIn: 'root',
})
export class SearchHttpService {
  constructor(private readonly _http: HttpClient) { }

  find(text: string) {
    return this._http.get<INpmSearchPackage[]>(`${ environment.api.search }/suggestions?q=${ text }`);
  }
}
