import { environment } from '../../../environments/environment';

import { INpmPackageVersion, INpmPackage } from '../../screens/package';

import { parseVersion } from './parse-version.util';
import { normalizeWeight } from './normalize-weight.util';
import { bytesToString } from './bytes-to-string.util';

export function graphPackage(
  pkg: INpmPackageVersion,
  pkgs: { [name: string]: INpmPackage },
  max: number,
  weightBySize: boolean,
) {
  let edges: cytoscape.ElementDefinition[] = [];

  if (pkg) {
    const deps = Object.keys(pkg.dependencies || { });
    const weight = weightBySize ? normalizeWeight(Math.sqrt(pkg.dist.unpackedSize || 1000), Math.sqrt(max), 0) * 100
                                : (deps.length || 1) * 5;

    edges.push({
      group: 'nodes',
      selectable: true,
      data: {
        id: pkg._id,
        name: pkg.name,
        version: pkg.version,
        content: `${pkg._id}\n${pkg.dist.unpackedSize ? bytesToString(pkg.dist.unpackedSize) : '??'}`,
        weight,
        fontSize: weight / 10,
        size: weightBySize ? (pkg.dist.unpackedSize || 0) / 1024 : undefined,
        outgoingEdges: !weightBySize ? deps.length : undefined,
      },
    });

    for (const name of deps) {
      if (pkgs[name]) {
        const version = pkg?.dependencies[name];
        const child = pkgs[name].versions[parseVersion(version)];

        if (child) {
          const childWeight = weightBySize ? normalizeWeight(Math.sqrt(child.dist.unpackedSize || 1000), Math.sqrt(max), 0) * 100
                                           : (Object.keys(child.dependencies || { }).length || 1) * 5;

          edges.push({
            group: 'edges',
            selectable: false,
            data: {
              id: `${pkg._id} -> ${child._id}`,
              source: pkg._id,
              target: child._id,
              weight: childWeight,
              size: weightBySize ? (child.dist.unpackedSize || 0) / 1024 : undefined,
              outgoingEdges: !weightBySize ? deps.length : undefined,
            },
          });

          edges = [
            ...edges,
            ...graphPackage(child, pkgs, max, weightBySize),
          ];
        }
      } else if (!environment.production) {
        console.warn(`${name} of parent ${pkg._id} not found!`);
      }
    }
  }

  return edges;
}
