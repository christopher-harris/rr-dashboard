import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataActionTypes, GetDataSuccess, GetPropertyFilters, GetPropertyFiltersSuccess} from './data.actions';
import {catchError, EMPTY, map, mergeMap} from 'rxjs';
import {DataService} from '../../shared/services/data.service';
import {SetProjectManagers} from '../project-managers/project-managers.actions';
import {DataRecord, DataRecordKeysEnum} from '../state/data-record.model';
import {PropertyFilter} from './data.reducer';

@Injectable()
export class DataEffects {
  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(DataActionTypes.GET_DATA),
    mergeMap(() => this.dataService.fetchData().pipe(
      mergeMap((response: DataRecord[]) => {
        const dataWithMetaData: DataRecord[] = response.map((record: DataRecord) => {
          return {
            ...record,
            metadata: {
              jsCreatedDate: this.convertDate(record.created),
              jsModifiedDate: this.convertDate(record.modified),
            }
          }
        }) as DataRecord[];
        return [
          new GetDataSuccess(dataWithMetaData),
          new SetProjectManagers(response),
          new GetPropertyFilters()
        ]
      }),
      catchError(() => EMPTY)
    ))
  ));

  getPropertyFilters$ = createEffect(() => this.actions$.pipe(
    ofType(DataActionTypes.GET_PROPERTY_FILTERS),
    mergeMap(() => this.dataService.fetchData().pipe(
      map((response: DataRecord[]) => {
        const properties = Object.keys(DataRecordKeysEnum);
        const propFilters: PropertyFilter[] = [];
        properties.forEach((property: any) => {
          const test = this.uniqueKeyValues(response, property);
          propFilters.push({
            property: property,
            values: test,
          })
        });
        console.log(propFilters);
        return new GetPropertyFiltersSuccess(propFilters);
      }),
      catchError(() => EMPTY)
    ))
  ));

  constructor(private actions$: Actions,
              private dataService: DataService) {
  }

  uniqueKeyValues(arr: any[], key: any) {
    return [... new Set(arr.map((obj) => {return obj[key]}))];
  }

  convertDate(dateString: string | null): Date | null {
    if (dateString !== null) {
      const jsDate = new Date(Date.parse(dateString));
      return jsDate;
    }
    return null;
  }
}
