import { Pipe, PipeTransform } from '@angular/core';

import { INpmPackageVersion } from '../../../screens/package';

@Pipe({
  name: 'totalCount',
})
export class TotalCountPipe implements PipeTransform {
  transform(
    selectedPkgs: { [id: string]: INpmPackageVersion },
    pkgs: { [id: string]: INpmPackageVersion },
  ) {
    const count = Object.keys(selectedPkgs).length;
    const total = Object.keys(pkgs).length;

    if (count === total) {
      return count;
    }

    return `${count} / ${total}`;
  }
}
