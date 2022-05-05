import {getAppState} from './app.reducer';
import {AppState} from './state/app-state.model';
import {createSelector} from '@ngrx/store';

export const selectAppState = (state: AppState) => state;

export const getUser = createSelector(
  getAppState,
  (state: AppState) => state.user
);
