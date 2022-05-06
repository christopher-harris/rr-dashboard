import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as dataStore from '../../../store/data';
import {Observable, switchMap} from 'rxjs';
import {DataRecord} from '../../../store/state/data-record.model';
import * as _ from 'lodash';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'rr-data-by-owner',
  templateUrl: './data-by-owner.component.html',
  styleUrls: ['./data-by-owner.component.scss']
})
export class DataByOwnerComponent implements OnInit {
  projectOwners$: Observable<any> = this.store.pipe(
    select(dataStore.selectPropertyFilterValues, 'project_owner'),
  );
  randomUsers$: Observable<any> = this.projectOwners$.pipe(
    switchMap((owners: string[]) => this.userService.getMultipleUsers(owners.length))
  );
  projectOwnersData: any[];
  randomUsers: any[];

  constructor(private store: Store<dataStore.DataState>,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.randomUsers$.subscribe((fakeUsersData) => {
      this.randomUsers = fakeUsersData;
    });
    this.projectOwners$.subscribe((owners: string[]) => {
      this.projectOwnersData = owners.map((owner) => {
        let userData: any = {};
        let totalBudget: number = 0;
        let projects: any[] = [];
        this.store.pipe(select(dataStore.selectProjectOwnersRecords, owner)).subscribe((ownersProjects: DataRecord[]) => {
          totalBudget = _.sumBy(ownersProjects, (record: DataRecord) => record.budget);
          projects = ownersProjects;
        });
        this.userService.getProjectManagerData().subscribe((response) => userData = response);
        return {
          owner,
          projects: [...projects],
          budget: totalBudget,
        }
      });
    });
  }

}
