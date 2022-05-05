import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import * as dataStore from '../../../store/data';
import {getEarliestDate, getOldestDate} from '../../../store/data';
import {DataRecordKeysEnum} from '../../../store/state/data-record.model';
import {KeyValue} from '@angular/common';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'rr-full-data',
  templateUrl: './full-data.component.html',
  styleUrls: ['./full-data.component.scss']
})
export class FullDataComponent implements OnInit {
  oldestCreatedRecordDate$: Observable<any> = this.store.pipe(
    select(getOldestDate),
    map((date: any) => {
      return this.convertStringDateToNgbDate(date);
    })
  );
  earliestModifiedRecordDate$: Observable<any> = this.store.pipe(
    select(getEarliestDate),
    map((date: any) => {
      return this.convertStringDateToNgbDate(date);
    })
  );
  records$: Observable<any> = this.store.pipe(select(dataStore.selectAllRecords));
  recordKeys = new Map<any, any>();

  constructor(private store: Store<any>,
              private dateAdapter: NgbDateAdapter<any>) { }

  ngOnInit(): void {
    (Object.keys(DataRecordKeysEnum) as Array<keyof typeof DataRecordKeysEnum>).map((key) => {
      this.recordKeys.set(key, DataRecordKeysEnum[key]);
    });
    this.store.dispatch(new dataStore.GetData());
    this.earliestModifiedRecordDate$.subscribe(x => console.log(x));
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  convertStringDateToNgbDate(dateString: string): NgbDateStruct | null {
    const jsDate = new Date(Date.parse(dateString));
    const ngbDate: NgbDateStruct | null = this.dateAdapter.fromModel(jsDate);
    return ngbDate;
  }

}
