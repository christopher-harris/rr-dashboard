import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataService} from '../../shared/services/data.service';
import {UserService} from '../../shared/services/user.service';
import {ProjectManagersActionTypes, SetProjectManagers, SetProjectManagersSuccess} from './project-managers.actions';
import {map, mapTo} from 'rxjs';
import * as _ from 'lodash';
import {ProjectManager} from '../state/project-manager.model';

@Injectable()
export class ProjectManagersEffects {
  setProjectManagers$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectManagersActionTypes.SET_PROJECT_MANAGERS),
    map((action: SetProjectManagers) => {
      // console.log(action.payload);
      const recordUsers = _.map(action.payload, 'project_owner');
      // console.log(recordUsers);
      const uniqueNames = _.uniq(recordUsers);
      const projectManagers = uniqueNames.map((name) => {
        this.userService.getProjectManagerData().pipe(
          mapTo((response: any) => response)
        ).subscribe((response) => {
          return new ProjectManager(response, name);
        });
      });
      return new SetProjectManagersSuccess(action.payload);
    })
  ));

  constructor(private actions$: Actions,
              private dataService: DataService,
              private userService: UserService) {}
}
