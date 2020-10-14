import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import pt from '@angular/common/locales/pt';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

registerLocaleData(pt);

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: environment.config.dbName,
      driverOrder: ['indexeddb', 'localstorage']
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
