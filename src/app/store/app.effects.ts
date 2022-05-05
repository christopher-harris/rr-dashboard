import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppActionTypes, GetCurrentUserSuccess} from './app.actions';
import {catchError, EMPTY, map, mergeMap, tap} from 'rxjs';
import {UserService} from '../shared/services/user.service';

@Injectable()
export class AppEffects {
  fetchUserData$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionTypes.GET_CURRENT_USER),
    mergeMap(() => this.userService.getRandomUser().pipe(
      tap((response) => console.log(response)),
      map((response: any) => new GetCurrentUserSuccess(response)),
      catchError(() => EMPTY)
    ))
  ));

  constructor(private actions$: Actions,
              private userService: UserService) {}

}
