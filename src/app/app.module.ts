import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MyComponent} from "../components/my/my";
import {MyDirective} from "../components/my-directive/my-directive";
import {MyPipe} from "../pipes/my-pipe";
import {MyProvider} from "../providers/my-provider";
import {SecondPagePage} from "../pages/second-page/second-page";
import {ModalPage} from "../pages/modal/modal";
import {ThirdPage} from "../pages/third/third";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SecondPagePage,
    ModalPage,
    ThirdPage,
    MyComponent,
    MyDirective,
    MyPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SecondPagePage,
    ModalPage,
    ThirdPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyProvider
  ]
})
export class AppModule {}
