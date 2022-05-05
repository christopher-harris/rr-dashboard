import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MOCK_DATA} from './mock-data';
import {DataRecord} from '../../store/state/data-record.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _data: BehaviorSubject<DataRecord[]> = new BehaviorSubject<DataRecord[]>([]);
  mockData$: Observable<DataRecord[]> = this._data.asObservable();

  constructor() {}

  fetchData() {
    const modifiedData: DataRecord[] = MOCK_DATA.map((record: DataRecord) => {
      return {
        ...record,
        id: uuid.v4()
      }
    });
    return of(modifiedData);
  }

}
