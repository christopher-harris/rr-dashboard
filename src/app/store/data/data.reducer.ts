import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {DataRecord} from '../state/data-record.model';
import {createFeatureSelector} from '@ngrx/store';
import * as dataActions from './data.actions';
import {JsDateRange} from './data.actions';

export interface PropertyFilter {
  property: string;
  values: string[];
}

export interface DataState extends EntityState<DataRecord> {
  filterDateRange: JsDateRange | null;
  searchQuery: string | null;
  propertyFilters: PropertyFilter[];
  selectedPropertyFilters: PropertyFilter[];
}

export const dataAdapter: EntityAdapter<DataRecord> = createEntityAdapter<DataRecord>({
  selectId: (model: DataRecord) => model.id,
});

export const initialState: DataState = dataAdapter.getInitialState({
  filterDateRange: null,
  searchQuery: null,
  propertyFilters: [],
  selectedPropertyFilters: [],
});

export function dataReducer(state: DataState = initialState, action: any): DataState {
  switch (action.type) {
    case dataActions.DataActionTypes.GET_DATA: {
      return {
        ...state,
      }
    }

    case dataActions.DataActionTypes.GET_DATA_SUCCESS: {
      return dataAdapter.addMany(action.payload, {
        ...state
      });
    }

    case dataActions.DataActionTypes.SEARCH_DATA: {
      return {
        ...state,
        searchQuery: action.payload
      }
    }

    case dataActions.DataActionTypes.FILTER_DATES: {
      return {
        ...state,
        filterDateRange: action.payload
      }
    }

    case dataActions.DataActionTypes.GET_PROPERTY_FILTERS_SUCCESS: {
      return {
        ...state,
        propertyFilters: action.payload
      }
    }

    case dataActions.DataActionTypes.SET_PROPERTY_FILTERS: {
      return {
        ...state,
        selectedPropertyFilters: action.payload
      }
    }

    case dataActions.DataActionTypes.UPDATE_RECORD: {
      console.log(action.payload);
      return dataAdapter.updateOne({
        id: action.payload.id,
        changes: action.payload
      }, {
        ...state
      });
    }
  }

  return state;
}

export const getRecordsState = createFeatureSelector<DataState>('records');
