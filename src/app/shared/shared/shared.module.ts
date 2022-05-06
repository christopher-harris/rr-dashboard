import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as UiComponents from '../../components';
import {UiModule} from '../../../../projects/ui/src/lib/ui.module';
import {OrderByPipe} from '../pipes/order-by.pipe';

const UI_COMPONENTS = [
  UiComponents.HeaderComponent,
  UiComponents.TableComponent
];

@NgModule({
  declarations: [
    ...UI_COMPONENTS,
    OrderByPipe
  ],
  exports: [
    ...UI_COMPONENTS,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    UiModule
  ]
})
export class SharedModule { }
