import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { PackageService } from './services';

@Injectable()
export class PackageResolver implements Resolve<void> {
  constructor(private readonly _packageService: PackageService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const name = route.paramMap.get('name');
    this._packageService.findOne(name);
  }
}
