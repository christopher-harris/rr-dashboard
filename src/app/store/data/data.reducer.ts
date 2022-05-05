import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {DataRecord} from '../state/data-record.model';
import {createFeatureSelector} from '@ngrx/store';
import * as dataActions from './data.actions';

export interface DataState extends EntityState<DataRecord> {}

export const dataAdapter: EntityAdapter<DataRecord> = createEntityAdapter<DataRecord>({
  selectId: (model: DataRecord) => model.id
});

export const initialState: DataState = dataAdapter.getInitialState();

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
  }

  return state;
}

export const getUserState = createFeatureSelector<DataState>('records');
