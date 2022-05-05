import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {AppEffects, appReducer} from './store';
import {DataEffects, dataReducer} from './store/data';
import {SharedModule} from './shared/shared/shared.module';
import {UiModule} from '../../projects/ui/src/lib/ui.module';
import {projectManagersReducer} from './store/project-managers/project-managers.reducer';
import {ProjectManagersEffects} from './store/project-managers';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    SharedModule,
    UiModule,
    StoreModule.forRoot({
      app: appReducer
    }),
    StoreModule.forFeature('records', dataReducer),
    StoreModule.forFeature('project-managers', projectManagersReducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([DataEffects]),
    EffectsModule.forFeature([ProjectManagersEffects]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
