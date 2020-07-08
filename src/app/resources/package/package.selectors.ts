import { createFeatureSelector, createSelector } from '@ngrx/store';
import cytoscape from 'cytoscape';

import { IPackageState } from './package.state';

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
  (pkg, _pkgs) => {
  const edges: cytoscape.ElementDefinition[] = [];
  const keys = ['dependencies', 'devDependencies', 'peerDependencies'];

  if (pkg) {
    edges.push({
      group: 'nodes',
      selected: true,
      data: {
        id: pkg._id,
        name: pkg.name,
        version: pkg.version,
      },
    });

    for (const key of keys) {
      const deps = Object.keys(pkg[key] || { });

      for (const d of deps) {
        const id = `${d}${pkg[key][d]}`;
        const type = key === 'dependencies' ? 'normal' :
                     key === 'devDependencies' ? 'development' : 'peer';

        edges.push({
          group: 'nodes',
          data: {
            id,
            name: d,
            version: pkg[key][d],
            type,
          },
        });

        edges.push({
          group: 'edges',
          selectable: false,
          data: {
            id: `${pkg._id} -> ${id}`,
            source: pkg._id,
            target: id,
          },
        });
      }
    }
  }

  return edges;
});
