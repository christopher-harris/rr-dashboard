import {Action} from '@ngrx/store';
import {DataRecord} from '../state/data-record.model';
import {PropertyFilter} from './data.reducer';

export interface JsDateRange {
  from: Date;
  to: Date;
}

export enum DataActionTypes {
  GET_DATA = '[Data] Get Data',
  GET_DATA_SUCCESS = '[Data] Get Data Success',
  GET_DATA_ERROR = '[Data] Get Data Error',
  SEARCH_DATA = '[Data] Search Data',
  FILTER_DATES = '[Data] Filter Dates',
  GET_PROPERTY_FILTERS ='[Data] Get Property Filters',
  GET_PROPERTY_FILTERS_SUCCESS ='[Data] Get Property Filters Success',
  SET_PROPERTY_FILTERS ='[Data] Set Property Filter Success',
  REMOVE_PROPERTY_FILTER ='[Data] Remove Property Filter Success',
  UPDATE_RECORD = '[Data] Update Record'
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

export class SearchData implements Action {
  readonly type = DataActionTypes.SEARCH_DATA;

  constructor(public payload: string) {}

}

export class FilterDates implements Action {
  readonly type = DataActionTypes.FILTER_DATES;

  constructor(public payload: JsDateRange) {}

}

export class GetPropertyFilters implements Action {
  readonly type = DataActionTypes.GET_PROPERTY_FILTERS;
}

export class GetPropertyFiltersSuccess implements Action {
  readonly type = DataActionTypes.GET_PROPERTY_FILTERS_SUCCESS;
  constructor(public payload: any[]) {
    console.log(payload);
  }
}

export class SetPropertyFilters implements Action {
  readonly type = DataActionTypes.SET_PROPERTY_FILTERS;

  constructor(public payload: PropertyFilter[]) {}

}

export class RemovePropertyFilter implements Action {
  readonly type = DataActionTypes.REMOVE_PROPERTY_FILTER;

  constructor(public payload: PropertyFilter) {}

}

export class UpdateRecord implements Action {
  readonly type = DataActionTypes.UPDATE_RECORD;

  constructor(public payload: DataRecord) {
    console.log(payload);
  }

}
