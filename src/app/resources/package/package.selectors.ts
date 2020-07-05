import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IPackageState } from './package.state';

export const selectState = createFeatureSelector<IPackageState>('package');
export const selectPackages = createSelector(selectState, s => s.packages);
export const selectError = createSelector(selectState, s => s.error);
export const selectActive = createSelector(selectState, s => s.active);
export const selectPackage = createSelector(selectState, s => s.packages[s.active]);
