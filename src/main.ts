import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MessageEffect } from '@store/message/message.effect';
import { messageReducer } from '@store/message/message.reducer';
import { UserEffect } from '@store/user/user.effect';
import { userReducer } from '@store/user/user.reducer';
import { AppStateInterface } from '@utils/interfaces/app-state.interface';
import { AppComponent } from 'app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      StoreModule.forRoot(<ActionReducerMap<AppStateInterface>>{
        userState: userReducer,
        messageState: messageReducer,
      }),
      EffectsModule.forRoot([UserEffect, MessageEffect]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
      })
    ),
  ],
});
