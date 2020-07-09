import { createFeatureSelector, createSelector } from '@ngrx/store';
import cytoscape from 'cytoscape';

import { IPackageState } from './package.state';
import { INpmPackageVersion, INpmPackage } from './models';

export const selectState = createFeatureSelector<IPackageState>('package');
export const selectPackages = createSelector(selectState, s => s.packages);
export const selectError = createSelector(selectState, s => s.error);
export const selectActive = createSelector(selectState, s => s.active);
export const selectPackage = createSelector(selectState, s => s.packages[s.active]);

export const selectLatestVersion = createSelector(selectPackage, p => {
  if (p) {
    const version = p['dist-tags']['latest'];
    return p.versions[version];
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
  const keys = ['dependencies', 'devDependencies', 'peerDependencies'];

  if (pkg) {
    edges.push({
      group: 'nodes',
      classes: 'root',
      selected: true,
      selectable: false,
      data: {
        id: pkg._id,
        name: pkg.name,
        version: pkg.version,
      },
    });

    for (const key of keys) {
      const deps = Object.keys(pkg[key] || { });

      for (const name of deps) {
        const version: string = pkg[key][name];
        const id = `${name}${version}`;
        const type = key === 'dependencies' ? 'normal' :
                     key === 'devDependencies' ? 'development' : 'peer';

        edges.push({
          group: 'nodes',
          classes: type,
          data: {
            id,
            parent: pkg._id,
            name,
            version,
            type,
          },
        });

        if (pkgs[name]) {
          const child = pkgs[name].versions[version.replace(/[@\^~>=]/gi, '')];

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
        }
      }
    }
  }

  return edges;
}
