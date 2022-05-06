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

@NgModule({
  declarations: [
    DashboardComponent,
    QuickStatsComponent,
    FullDataComponent,
    RecentActivityComponent
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
