import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as dataStore from '../../../store/data';
import {select, Store} from '@ngrx/store';
import * as _ from 'lodash';
import {DataRecord} from '../../../store/state/data-record.model';

@Component({
  selector: 'rr-data-by-division',
  templateUrl: './data-by-division.component.html',
  styleUrls: ['./data-by-division.component.scss']
})
export class DataByDivisionComponent implements OnInit {
  projectDivisions$: Observable<any[]> = this.store.pipe(select(dataStore.selectPropertyFilterValues, 'division'));
  projectDivisionsData: any[] = [];

  constructor(private store: Store<dataStore.DataState>) {}

  ngOnInit(): void {
    this.projectDivisions$.subscribe((divisions: string[]) => {
      divisions.forEach((division: string) => {
        let divisionBudget: number = 0;
        this.store.pipe(select(dataStore.selectDivisionRecords, division)).subscribe((records) => {
          divisionBudget = _.sumBy(records, (record: DataRecord) => record.budget);
        });
        this.projectDivisionsData.push({
          division: division,
          budget: divisionBudget
        });
      })
    });
  }

}
