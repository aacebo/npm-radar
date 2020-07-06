import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { SearchService } from './services';

@Injectable()
export class SearchResolver implements Resolve<void> {
  constructor(private readonly _searchService: SearchService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const q = route.queryParamMap.get('q');

    if (q) {
      this._searchService.find(q);
    }
  }
}
