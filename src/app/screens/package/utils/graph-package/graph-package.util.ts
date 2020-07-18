import { environment } from '../../../../../environments/environment';

import { INpmPackageVersion, INpmPackage } from '../../models';
import { parseVersion } from '../parse-version/parse-version.util';

export function graphPackage(pkg: INpmPackageVersion, pkgs: { [name: string]: INpmPackage }) {
  let edges: cytoscape.ElementDefinition[] = [];

  if (pkg) {
    const deps = Object.keys(pkg.dependencies || { });

    edges.push({
      group: 'nodes',
      classes: 'root',
      selectable: true,
      data: {
        id: pkg._id,
        name: pkg.name,
        version: pkg.version,
        weight: deps.length ? (deps.length * 5) + 5 : 5,
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
            ...graphPackage(child, pkgs),
          ];
        }
      } else if (!environment.production) {
        console.warn(`${name} of parent ${pkg._id} not found!`);
      }
    }
  }

  return edges;
}
