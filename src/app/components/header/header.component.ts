import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {GetCurrentUser, getUser} from '../../store';
import {UserData} from '../../store/state/user-data.model';

@Component({
  selector: 'rr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData$: Observable<UserData | null> = this.store.pipe(
    select(getUser)
  );

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCurrentUser());
    this.userData$.subscribe(x => console.log(x));
  }

}
