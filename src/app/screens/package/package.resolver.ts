import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { PackageService, INpmPackage } from '../../resources/package';

@Injectable()
export class PackageResolver implements Resolve<INpmPackage> {
  constructor(private readonly _packageService: PackageService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const name = route.paramMap.get('name');
    this._packageService.findOne(name);
    return this._packageService.package$;
  }
}