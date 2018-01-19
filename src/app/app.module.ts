import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {TestPage} from "../pages/test/test";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpProvider} from '../providers/http/http';
import {HttpModule} from "@angular/http";
import {AdMobPro} from '@ionic-native/admob-pro';
import {BoardProvider} from '../providers/board/board';
import {ShRentalPage} from "../pages/sh-rental/sh-rental";
import {HttpClientModule} from "@angular/common/http";
import {BlogInfoPage} from "../pages/blog-info/blog-info";
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {NewsListPage} from "../pages/news-list/news-list";


@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage, TestPage, ShRentalPage, BlogInfoPage, NewsListPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp), HttpModule, HttpClientModule, LazyLoadImageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage, TestPage, ShRentalPage, BlogInfoPage, NewsListPage
    ],

    providers: [
        StatusBar, AdMobPro,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpProvider,
        BoardProvider,
        InAppBrowser
    ]
})
export class AppModule {
}




