import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromData from './data.reducer';
import {DataState, PropertyFilter} from './data.reducer';
import * as _ from 'lodash';
import {DataRecord} from '../state/data-record.model';
import * as dayjs from 'dayjs';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export const selectDataFeature = createFeatureSelector('records');

export const recordsState = createSelector(fromData.getRecordsState, (state) => state);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = fromData.dataAdapter.getSelectors(recordsState);

export const selectRecordIds = selectIds;

export const selectRecordEntities = selectEntities;

export const getSearchQuery = createSelector(
  fromData.getRecordsState,
  (state) => state.searchQuery
);

export const getDateRangeFilter = createSelector(
  fromData.getRecordsState,
  (state: DataState) => state.filterDateRange
);

export const selectPropertyFilters = createSelector(
  recordsState,
  (state: DataState) => state.propertyFilters
);

export const selectActivePropertyFilters = createSelector(
  recordsState,
  (state: DataState) => state.selectedPropertyFilters
);

export const selectAllRecords = createSelector(
  selectAll,
  getSearchQuery,
  getDateRangeFilter,
  selectActivePropertyFilters,
  (data, searchQuery, dateRangeFilter, propertyFilters) => {
    if (searchQuery) {
      return data.filter((record: DataRecord) => {
        return (
          record.title.toLowerCase().includes(searchQuery as string) ||
          record.status.toLowerCase().includes(searchQuery as string) ||
          record.project_owner.toLowerCase().includes(searchQuery as string) ||
          record.division.toLowerCase().includes(searchQuery as string) ||
          record.budget.toString().toLowerCase().includes(searchQuery as string)
        );
      });
    }
    if (dateRangeFilter !== null) {
      return data.filter((record: DataRecord) => {
        if (dateRangeFilter.from && dateRangeFilter.to === null) {
          return dayjs(record.metadata.jsCreatedDate).isSameOrAfter(dateRangeFilter.from, 'day');
        } else if (dateRangeFilter.from && dateRangeFilter.to) {
          return dayjs(record.metadata.jsCreatedDate).isBetween(dateRangeFilter.from, dateRangeFilter.to, 'day') || dayjs(record.metadata.jsModifiedDate).isBetween(dateRangeFilter.from, dateRangeFilter.to, 'day');
        } else {
          return data;
        }
      })
    }
    return data;
  }
);

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

export const selectPropertyFilterValues = createSelector(
  selectPropertyFilters,
  (filters: PropertyFilter[], property: any) => {
    const filter = filters.find((filter) => filter.property === property);
    return filter ? filter.values : [];
  }
);

export const selectDivisionRecords = createSelector(
  selectAll,
  (records: DataRecord[], division: string) => {
    return records.filter((record) => {
      return record.division === division;
    })
  }
);

export const selectProjectOwnersRecords = createSelector(
  selectAll,
  (records: DataRecord[], projectOwner: string) => {
    return records.filter((record: DataRecord) => {
      return record.project_owner === projectOwner;
    });
  }
);
