import {NgModule} from '@angular/core';
import {BadgeModule} from './components/badge/badge.module';
import {CardModule, DateRangePickerModule} from './components';

const uiModules = [
  BadgeModule,
  CardModule,
  DateRangePickerModule
];

@NgModule({
  declarations: [],
  imports: [
    ...uiModules
  ],
  exports: [
    ...uiModules
  ],
})
export class UiModule {}
