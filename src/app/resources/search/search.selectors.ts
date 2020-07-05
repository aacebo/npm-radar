import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISearchState } from './search.state';

export const selectState = createFeatureSelector<ISearchState>('search');
export const selectText = createSelector(selectState, s => s.text);
export const selectResults = createSelector(selectState, s => s.results);
export const selectError = createSelector(selectState, s => s.error);
export const selectEntities = createSelector(selectResults, r => Object.values(r));
