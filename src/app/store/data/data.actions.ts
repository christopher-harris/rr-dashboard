import {Action} from '@ngrx/store';
import {DataRecord} from '../state/data-record.model';

export enum DataActionTypes {
  GET_DATA = '[Data] Get Data',
  GET_DATA_SUCCESS = '[Data] Get Data Success',
  GET_DATA_ERROR = '[Data] Get Data Error'
}

export class GetData implements Action {
  readonly type = DataActionTypes.GET_DATA;
}

export class GetDataSuccess implements Action {
  readonly type = DataActionTypes.GET_DATA_SUCCESS;
  constructor(public payload: DataRecord[]) {
    console.log(payload);
  }
}

export class GetDataError implements Action {
  readonly type = DataActionTypes.GET_DATA_ERROR;

  constructor(public payload: any) {}

}
