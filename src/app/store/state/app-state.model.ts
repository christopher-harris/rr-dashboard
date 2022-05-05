import {UserData} from './user-data.model';

export interface AppState {
  user: UserData | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}
