import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getTotalBudget, getTotalInProgress} from '../../../store/data';

@Component({
  selector: 'rr-quick-stats',
  templateUrl: './quick-stats.component.html',
  styleUrls: ['./quick-stats.component.scss']
})
export class QuickStatsComponent implements OnInit {
  totalBudget$: Observable<number> = this.store.pipe(select(getTotalBudget));
  totalInProgress$: Observable<number> = this.store.pipe(select(getTotalInProgress));

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
  }

}
