import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromData from './data.reducer';
import * as _ from 'lodash';
import {DataRecord} from '../state/data-record.model';

export const selectDataFeature = createFeatureSelector('records');

export const getData = createSelector(fromData.getUserState, (state) => state);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = fromData.dataAdapter.getSelectors(getData);

export const selectRecordIds = selectIds;

export const selectRecordEntities = selectEntities;

export const selectAllRecords = selectAll;

export const getTotalBudget = createSelector(
  selectAll,
  (data: DataRecord[]) => {
    const sum = _.sumBy(data, (record: DataRecord) => {
      return record.budget;
    });
    return sum;
  }
);

export const getTotalInProgress = createSelector(
  selectAll,
  (data: DataRecord[]) => {
    const inProgressRecords = data.filter((record: DataRecord) => record.status === 'working').length;
    console.log(inProgressRecords);
    return inProgressRecords;
  }
);

export const getOldestDate = createSelector(
  selectAll,
  (data: DataRecord[]) => {
    const oldestCreated: DataRecord = _.orderBy(data, ['created'], ['asc'])[0];
    return oldestCreated.created;
  }
);

export const getEarliestDate = createSelector(
  selectAll,
  (data: DataRecord[]) => {
    const mostRecentModified: DataRecord = _.orderBy(data, ({modified}) => modified === null ? '' : modified, ['desc'])[0];
    return mostRecentModified.modified;
  }
);
