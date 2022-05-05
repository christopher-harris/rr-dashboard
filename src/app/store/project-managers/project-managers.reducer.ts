import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ProjectManager} from '../state/project-manager.model';
import {createFeatureSelector} from '@ngrx/store';
import {ProjectManagersActionTypes} from './project-managers.actions';

export interface ProjectManagersState extends EntityState<ProjectManager> {}

export const projectManagersAdapter: EntityAdapter<ProjectManager> = createEntityAdapter<ProjectManager>();

const initialState: ProjectManagersState = projectManagersAdapter.getInitialState();

export function projectManagersReducer(state: ProjectManagersState = initialState, action: any): ProjectManagersState {
  switch (action.type) {
    case ProjectManagersActionTypes.SET_PROJECT_MANAGERS: {
      return {...state};
    }
    case ProjectManagersActionTypes.SET_PROJECT_MANAGERS_SUCCESS: {
      console.log(action.payload);
      return projectManagersAdapter.addMany(action.payload, {...state});
    }
  }
  return state;
}

export const getProjectManagersState = createFeatureSelector<ProjectManagersState>('project-managers');
