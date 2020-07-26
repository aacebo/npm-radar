import { Pipe, PipeTransform } from '@angular/core';

import { INpmPackageVersion } from '../../../screens/package';
import { bytesToString } from '../../utils';

@Pipe({
  name: 'totalSize',
})
export class TotalSizePipe implements PipeTransform {
  transform(
    selectedPkgs: { [id: string]: INpmPackageVersion },
    pkgs: { [id: string]: INpmPackageVersion },
  ) {
    const bytes = this._calcSize(selectedPkgs);
    const total = this._calcSize(pkgs);
    const pct = (bytes / total) * 100;

    if (total === bytes) {
      return bytesToString(bytes);
    }

    return `${bytesToString(bytes)} (${pct.toFixed(2)}%)`;
  }

  private _calcSize(pkgs: { [id: string]: INpmPackageVersion }) {
    let bytes = 0;

    for (const pkg of Object.values(pkgs)) {
      bytes += pkg.dist.unpackedSize || 0;
    }

    return bytes;
  }
}
