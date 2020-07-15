import { createFeatureSelector, createSelector } from '@ngrx/store';
import cytoscape from 'cytoscape';

import { IPackageState } from './package.state';
import { INpmPackageVersion, INpmPackage } from './models';
import { parseVersion } from './utils';

export const selectState = createFeatureSelector<IPackageState>('package');
export const selectPackages = createSelector(selectState, s => s.packages);
export const selectError = createSelector(selectState, s => s.error);
export const selectActive = createSelector(selectState, s => s.active);
export const selectVersion = createSelector(selectState, s => s.version);
export const selectLoading = createSelector(selectState, s => s.loading);
export const selectPackage = createSelector(selectState, s => s.packages[s.active]);

export const selectLatestVersion = createSelector(
  selectPackage,
  selectVersion,
  (p, v) => {
  if (p) {
    const latest = p['dist-tags']['latest'];
    return p.versions[v || latest];
  }
});

export const selectDependencies = createSelector(
  selectLatestVersion,
  selectPackages,
  (pkg, pkgs) => {
    return addPackage(pkg, pkgs);
});

function addPackage(pkg: INpmPackageVersion, pkgs: { [name: string]: INpmPackage }) {
  let edges: cytoscape.ElementDefinition[] = [];

  if (pkg) {
    const deps = Object.keys(pkg.dependencies || { });

    edges.push({
      group: 'nodes',
      classes: 'root',
      selectable: false,
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
            ...addPackage(child, pkgs),
          ];
        }
      } else {
        console.log(`couldn't find ${name} for root ${pkg.name}`);
      }
    }
  }

  return edges;
}
