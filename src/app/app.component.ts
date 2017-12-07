import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {AdMobPro} from "@ionic-native/admob-pro";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private admob: AdMobPro) {


        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            var admobid = {
                interstitial: 'ca-app-pub-6826082357124500/9307296734',
                banner: 'ca-app-pub-6826082357124500/7593091515'

            };
            this.admob.prepareInterstitial({
                adId: admobid.interstitial,
                isTesting: false
                , autoShow: true

            })

            // this.admob.showInterstitial();

            this.admob.createBanner({
                adId: admobid.banner,
                isTesting: false,
                autoShow: true,
                position: this.admob.AD_POSITION.BOTTOM_CENTER
            })

        });
    }
}
