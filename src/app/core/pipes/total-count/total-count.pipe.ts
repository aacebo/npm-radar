import { Pipe, PipeTransform } from '@angular/core';

import { INpmPackageVersion } from '../../../screens/package';

@Pipe({
  name: 'totalCount',
})
export class TotalCountPipe implements PipeTransform {
  transform(pkgs: { [id: string]: INpmPackageVersion }) {
    return Object.keys(pkgs).length;
  }
}
