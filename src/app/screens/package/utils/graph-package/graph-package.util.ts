import { environment } from '../../../../../environments/environment';

import { INpmPackageVersion, INpmPackage } from '../../models';

import { parseVersion } from '../parse-version/parse-version.util';
import { normalizeWeight } from '../normalize-weight/normalize-weight.util';

export function graphPackage(
  pkg: INpmPackageVersion,
  pkgs: { [name: string]: INpmPackage },
  max: number,
) {
  let edges: cytoscape.ElementDefinition[] = [];

  if (pkg) {
    const deps = Object.keys(pkg.dependencies || { });
    const weight = normalizeWeight(Math.sqrt(pkg.dist.unpackedSize || 1000), Math.sqrt(max), 0) * 100;

    edges.push({
      group: 'nodes',
      selectable: true,
      data: {
        id: pkg._id,
        name: pkg.name,
        version: pkg.version,
        weight,
        fontSize: weight / 10,
      },
    });

    for (const name of deps) {
      if (pkgs[name]) {
        const version = pkg?.dependencies[name];
        const child = pkgs[name].versions[parseVersion(version)];

        if (child) {
          edges.push({
            group: 'edges',
            selectable: false,
            data: {
              id: `${pkg._id} -> ${child._id}`,
              source: pkg._id,
              target: child._id,
            },
          });

          edges = [
            ...edges,
            ...graphPackage(child, pkgs, max),
          ];
        }
      } else if (!environment.production) {
        console.warn(`${name} of parent ${pkg._id} not found!`);
      }
    }
  }

  return edges;
}
