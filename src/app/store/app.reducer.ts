import {AppState} from './state/app-state.model';
import * as appActions from './app.actions';
import {createFeatureSelector} from '@ngrx/store';

const initialState: AppState = {
  user: null,
  loading: false,
  loaded: false,
  error: null
}

export function appReducer(state: AppState = initialState, action: any): AppState {
  switch (action.type) {
    case appActions.AppActionTypes.GET_CURRENT_USER: {
      return {
        ...state,
        loading: true,
      }
    }
    case appActions.AppActionTypes.GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loaded: true,
        loading: true,
      }
    }
  }

  return state;
}

// export const appReducer = createReducer(
//   initialState,
//   on(getCurrentUser, (state) => state),
//   on(getCurrentUserSuccess, (state, {user}) => ({user: user}))
// );

export const getAppState = createFeatureSelector<AppState>('app');
