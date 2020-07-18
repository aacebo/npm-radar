import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { INpmPackage } from './models';

@Injectable({
  providedIn: 'root',
})
export class PackageHttpService {
  constructor(private readonly _http: HttpClient) { }

  findOne(name: string) {
    return this._http.get<INpmPackage>(`${ environment.api.pkg }/${ name }`);
  }
}
