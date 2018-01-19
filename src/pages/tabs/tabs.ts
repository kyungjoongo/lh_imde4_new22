import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {TestPage} from "../test/test";
import {ShRentalPage} from "../sh-rental/sh-rental";
import {BlogInfoPage} from "../blog-info/blog-info";
import {Platform} from "ionic-angular";
import {AdMobPro} from "@ionic-native/admob-pro";
import {NewsListPage} from "../news-list/news-list";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = BlogInfoPage;
    tab3Root = HomePage
    tab2Root = AboutPage;
    tab4Root = NewsListPage;

    constructor(public platform: Platform, public admob: AdMobPro) {

        this.getAdMob();
    }


    getAdMob() {

    }


}
