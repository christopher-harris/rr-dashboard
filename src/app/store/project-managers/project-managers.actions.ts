import {Action} from '@ngrx/store';
import {DataRecord} from '../state/data-record.model';

export enum ProjectManagersActionTypes {
  SET_PROJECT_MANAGERS = '[Data] Set Project Managers',
  SET_PROJECT_MANAGERS_SUCCESS = '[Data] Set Project Managers Success'
}

export class SetProjectManagers implements Action {
  readonly type = ProjectManagersActionTypes.SET_PROJECT_MANAGERS;

  constructor(public payload: DataRecord[]) {}

}

export class SetProjectManagersSuccess implements Action {
  readonly type = ProjectManagersActionTypes.SET_PROJECT_MANAGERS_SUCCESS;

  constructor(public payload: any[]) {
    // console.log(payload);
  }

}
