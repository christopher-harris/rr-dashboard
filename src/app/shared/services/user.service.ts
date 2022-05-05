import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserData} from '../../store/state/user-data.model';

export interface RandomUserResponse {
  info: any;
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getRandomUser(): Observable<UserData> {
    const params: HttpParams = new HttpParams()
      .set('format', 'json')
      .set('nat', 'us');
    return this.http.get<RandomUserResponse>('https://randomuser.me/api/', {params}).pipe(
      map((response: RandomUserResponse) => response.results[0] as UserData)
    );
  }

  getProjectManagerData(): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('format', 'json')
      .set('nat', 'us')
      .set('exc', 'name,id');
    return this.http.get<RandomUserResponse>('https://randomuser.me/api/', {params}).pipe(
      map((response: RandomUserResponse) => response.results[0] as UserData)
    );
  }

}
