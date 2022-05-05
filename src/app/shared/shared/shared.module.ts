import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as UiComponents from '../../components';
import {UiModule} from '../../../../projects/ui/src/lib/ui.module';

const UI_COMPONENTS = [
  UiComponents.HeaderComponent,
  UiComponents.TableComponent
];

@NgModule({
  declarations: [
    ...UI_COMPONENTS
  ],
  exports: [
    ...UI_COMPONENTS
  ],
  imports: [
    CommonModule,
    UiModule
  ]
})
export class SharedModule { }
