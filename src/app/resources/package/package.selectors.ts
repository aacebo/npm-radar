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

export const selectDependencies = createSelector(selectLatestVersion, p => {
  const edges: cytoscape.ElementDefinition[] = [];

  if (p?.dependencies) {
    const deps = Object.keys(p.dependencies);

    edges.push({
      group: 'nodes',
      data: { id: p._id, name: p._id },
    });

    for (const d of deps) {
      const dep = `${d}${p.dependencies[d]}`;

      edges.push({
        group: 'nodes',
        data: {
          id: dep,
          name: dep,
        },
      });

      edges.push({
        group: 'edges',
        data: {
          id: `${p._id} -> ${dep}`,
          name: `${p._id} -> ${dep}`,
          source: p._id,
          target: dep,
        },
      });
    }
  }

  return edges;
});
