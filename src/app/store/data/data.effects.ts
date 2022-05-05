import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataActionTypes, GetDataSuccess} from './data.actions';
import {catchError, EMPTY, mergeMap} from 'rxjs';
import {DataService} from '../../shared/services/data.service';
import {SetProjectManagers} from '../project-managers/project-managers.actions';

@Injectable()
export class DataEffects {
  fetchData$ = createEffect( () => this.actions$.pipe(
    ofType(DataActionTypes.GET_DATA),
    mergeMap(() => this.dataService.fetchData().pipe(
      mergeMap((response) => {
        return [
          new GetDataSuccess(response),
          new SetProjectManagers(response)
        ]
      }),
      catchError(() => EMPTY)
    ))
  ));

  constructor(private actions$: Actions,
              private dataService: DataService) {}
}
