import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";

/**
 * Generated class for the ShRentalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-sh-rental',
    templateUrl: 'sh-rental.html',
})
export class ShRentalPage {
    results = [];
    gooCode = 110;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public toastcontroller: ToastController,
                public httpprovider: HttpProvider) {
        this.getShList();
    }


    selectGoo() {

        this.getShList()
    }

    getShList() {


        let loader = this.loadingCtrl.create({
            content: '로딩중..'
        });

        loader.present();

        this.httpprovider.getShRentalList(1, 11, this.gooCode).subscribe(res => {
            console.log(res + "##############");
            let result2= JSON.parse(res.result);

            console.log("result2.hsmpList:"+ JSON.stringify(result2.hsmpList));

            this.results = result2.hsmpList;

            loader.dismissAll();
        });
    }
}
