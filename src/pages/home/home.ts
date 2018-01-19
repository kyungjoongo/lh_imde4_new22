import {Component, ViewChild} from '@angular/core';
import {LoadingController, NavController, Platform, ToastController} from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";
import {Content} from "ionic-angular";
import {throttle} from 'lodash';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {AdMobPro} from "@ionic-native/admob-pro";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    ssi = '';
    goo = '';
    selectedGoo = '';
    gooList = [];
    resultList = [];
    page = 1;
    loader: any;
    isFirst : boolean = true;
    @ViewChild(Content) content: Content;


    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public toastcontroller: ToastController,
                public platform: Platform,
                public admob: AdMobPro,
                private   iab: InAppBrowser,
                public httpprovider: HttpProvider) {

        this.scrollToTop = throttle(this.scrollToTop, 500, {leading: true, trailing: false})

    }

    createLoading(text) {
        this.loader = this.loadingCtrl.create({
            content: text,
            spinner: 'dots',
            enableBackdropDismiss: true
        });


    }


    /*  ionViewDidEnter() {
          this.presentToast("시,구를 선택하세요..", 1000, 'toast001');

      }*/

    getAdMob(){
        if (this.platform.is('cordova')) {

            let admobid = {
                interstitial: 'ca-app-pub-6826082357124500/9307296734',
                banner: 'ca-app-pub-6826082357124500/2589453216'

            };
            this.admob.createBanner({
                adId: admobid.banner,
                isTesting: false,
                autoShow: true,
                position: this.admob.AD_POSITION.BOTTOM_CENTER
            })

        }
    }


    selectSi() {
        let loader = this.loadingCtrl.create({
            content: '로딩중..'
        });

        if ( this.isFirst ){
            this.getAdMob();
            this.isFirst = false;
        }

        loader.present().then(() => {

                this.httpprovider.getGooList(this.ssi).subscribe(response => {
                    this.gooList = response.result;
                    console.log(response.result);

                    this.selectedGoo = null
                    this.page = 1;




                    this.httpprovider.getAll(this.page, this.ssi, this.selectedGoo).subscribe(responseListresult => {
                        console.log(responseListresult.resultList);
                        this.resultList = responseListresult.resultList;
                        this.page++;

                        this.httpprovider.getAll(this.page, this.ssi, this.selectedGoo).subscribe(responseListresult => {

                            var fetchedList = [];
                            fetchedList = responseListresult.resultList;
                            for (var i = 0; i < fetchedList.length; i++) {
                                this.resultList.push(fetchedList[i]);
                            }


                            loader.dismiss();

                            this.scrollToTop();


                        })

                    })


                }, error2 => {

                    alert(error2);
                })
            }
        )


    }


    selectGoo() {
        this.createLoading('리스트를 가지고 오는중..');
        this.loader.present().then(() => {
            this.page = 1;

            this.httpprovider.getAll(this.page, this.ssi, this.selectedGoo).subscribe(responseListresult => {
                console.log(responseListresult.resultList);
                this.resultList = responseListresult.resultList;
                //this.loader.dismissAll();

                this.page++;

                this.httpprovider.getAll(this.page, this.ssi, this.selectedGoo).subscribe(responseListresult => {

                    var fetchedList = [];
                    fetchedList = responseListresult.resultList;
                    for (var i = 0; i < fetchedList.length; i++) {
                        this.resultList.push(fetchedList[i]);
                    }


                    this.loader.dismiss();

                    this.scrollToTop();

                    /*let scrollContent: Content = document.getElementById("listScroll");
                    scrollContent.scrollToTop;*/

                })
            })

        });


    }


    scrollToTop() {
        this.content.scrollToTop();
    }

    openInAppBrowser(pblancId) {

        this.iab.create('https://m.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcView.do#detailPage?pblancId=' + pblancId, '_blank', 'location=no,toolbar=yes');
    }


    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        this.page++;

        this.httpprovider.getAll(this.page, this.ssi, this.selectedGoo).subscribe(responseListresult => {

            var fetchedList = [];
            fetchedList = responseListresult.resultList;

            if (fetchedList.length == 0) {

                this.presentToast('더이상 데이타가 없습니다', 1000, '')
            } else {

                for (var i = 0; i < fetchedList.length; i++) {
                    this.resultList.push(fetchedList[i]);
                }

                this.page++;


                this.httpprovider.getAll(this.page, this.ssi, this.selectedGoo).subscribe(responseListresult => {

                    var fetchedList = [];
                    fetchedList = responseListresult.resultList;

                    if (fetchedList.length == 0) {

                        this.presentToast('더이상 데이타가 없습니다', 1000, '')
                    } else {

                        for (var i = 0; i < fetchedList.length; i++) {
                            this.resultList.push(fetchedList[i]);
                        }


                    }

                    infiniteScroll.complete();


                })


            }

            infiniteScroll.complete();


        })


    }


    presentToast(message, duration, cssClass) {
        let toast = this.toastcontroller.create({
            message: message,
            duration: duration,
            cssClass: cssClass,
            position: 'bottom'
        });
        toast.present();
    }


}
