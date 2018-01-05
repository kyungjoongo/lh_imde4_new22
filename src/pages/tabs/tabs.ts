import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {TestPage} from "../test/test";
import {ShRentalPage} from "../sh-rental/sh-rental";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab3Root = ShRentalPage
    tab2Root = AboutPage;

    /*tab3Root = TestPage;*/
    tab4Root = TestPage;

    constructor() {

    }
}
