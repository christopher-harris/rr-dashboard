import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {QuickStatsComponent} from './components/quick-stats/quick-stats.component';
import {FullDataComponent} from './components/full-data/full-data.component';
import {RecentActivityComponent} from './components/recent-activity/recent-activity.component';
import {SharedModule} from '../shared/shared/shared.module';
import {UiModule} from '../../../projects/ui/src/lib/ui.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataByOwnerComponent} from './components/data-by-owner/data-by-owner.component';
import {DataByDivisionComponent} from './components/data-by-division/data-by-division.component';

@NgModule({
  declarations: [
    DashboardComponent,
    QuickStatsComponent,
    FullDataComponent,
    RecentActivityComponent,
    DataByOwnerComponent,
    DataByDivisionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    UiModule,
    FormsModule,
  ]
})
export class DashboardModule {
}
