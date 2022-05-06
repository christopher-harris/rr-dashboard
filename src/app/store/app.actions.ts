import {Action, createAction, props} from '@ngrx/store';

export enum AppActionTypes {
  GET_CURRENT_USER = '[App] Get Current User',
  GET_CURRENT_USER_SUCCESS = '[App] Get Current User Success',
  GET_CURRENT_USER_ERROR = '[App] Get Current User Error'
}

export class GetCurrentUser implements Action {
  readonly type = AppActionTypes.GET_CURRENT_USER;
}

export class GetCurrentUserSuccess implements Action {
  readonly type = AppActionTypes.GET_CURRENT_USER_SUCCESS;

  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class GetCurrentUserError implements Action {
  readonly type = AppActionTypes.GET_CURRENT_USER_ERROR;

  constructor(public payload: any) {
    // console.log(payload);
  }
}

export const getCurrentUser = createAction(
  AppActionTypes.GET_CURRENT_USER,
);

export const getCurrentUserSuccess = createAction(
  AppActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ user: any }>()
);

export const getCurrentUserError = createAction(
  AppActionTypes.GET_CURRENT_USER_ERROR,
  props<any>()
);
