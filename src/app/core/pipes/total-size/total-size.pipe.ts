import { Pipe, PipeTransform } from '@angular/core';

import { INpmPackageVersion } from '../../../screens/package';
import { bytesToString } from '../../utils';

@Pipe({
  name: 'totalSize',
})
export class TotalSizePipe implements PipeTransform {
  transform(pkgs: { [id: string]: INpmPackageVersion }) {
    let bytes = 0;

    for (const pkg of Object.values(pkgs)) {
      bytes += pkg.dist.unpackedSize || 0;
    }

    return bytesToString(bytes);
  }
}
