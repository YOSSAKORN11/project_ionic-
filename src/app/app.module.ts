import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FramDetailPage } from '../pages/fram-detail/fram-detail';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UploadsSharedUploadProvider } from '../providers/uploads-shared-upload/uploads-shared-upload';

// import { promise } from 'promise-polyfill';

export const config = {
    apiKey: "AIzaSyDhV0RNM_Co7VBkNXRTTfbibp65U4tW_ok",
    authDomain: "app-project-d97a3.firebaseapp.com",
    databaseURL: "https://app-project-d97a3.firebaseio.com",
    projectId: "app-project-d97a3",
    storageBucket: "app-project-d97a3.appspot.com",
    messagingSenderId: "699891071341"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FramDetailPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FramDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UploadsSharedUploadProvider,
   // promise
  ]
})
export class AppModule {}
