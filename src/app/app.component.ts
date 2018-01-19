import {Component, ViewChild} from '@angular/core';
import {AlertController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {AdMobPro} from "@ionic-native/admob-pro";
import {ContactPage} from "../pages/contact/contact";
import {TestPage} from "../pages/test/test";
import {HomePage} from "../pages/home/home";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;
    @ViewChild(Nav) nav: Nav;
    alert: any;

    /*rootPage: any = TestPage;*/

    constructor(public platform: Platform
        , public statusBar: StatusBar
        , public splashScreen: SplashScreen
        , public alertCtrl: AlertController
        , public admob: AdMobPro) {


        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            let admobid = {
                interstitial: 'ca-app-pub-6826082357124500/9307296734',
                banner: 'ca-app-pub-6826082357124500/2589453216'

            };
            this.admob.prepareInterstitial({
                adId: admobid.interstitial,
                isTesting: false
                , autoShow: true

            })


            platform.registerBackButtonAction(() => {

                if (this.nav.canGoBack()) {
                    this.nav.pop();
                } else {
                    if (this.alert) {
                        this.alert.dismiss();
                        this.alert = null;
                    } else {
                        this.showAlert();
                    }
                }
            });

        });


    }


    showAlert() {
        this.alert = this.alertCtrl.create({
            title: 'Really?',
            message: '진짜 나가시게요?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        this.alert = null;
                    }
                },
                {
                    text: 'Exit',
                    handler: () => {
                        this.platform.exitApp();
                    }
                }
            ]
        });
        this.alert.present();
    }
}
