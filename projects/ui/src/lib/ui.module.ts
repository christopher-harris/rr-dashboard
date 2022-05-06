import {NgModule} from '@angular/core';
import {BadgeModule, CardModule, DateRangePickerModule, ModalModule} from './components';

const uiModules = [
  BadgeModule,
  CardModule,
  DateRangePickerModule,
  ModalModule
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
export class UiModule {
}
