import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";

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

    createLoading(text) {
        this.loader = this.loadingCtrl.create({
            content: text
        });
    }

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public toastcontroller: ToastController,
                public httpprovider: HttpProvider) {
    }


    selectSi() {


        let loader = this.loadingCtrl.create({
            content: 'Loading..'
        });

        loader.present().then(() => {

                this.httpprovider.getGooList(this.ssi).subscribe(response => {
                    this.gooList = response.result;
                    console.log(response.result);

                    this.selectedGoo = '';
                    this.page = 1;


                    this.httpprovider.getAll(this.page, this.ssi, this.selectedGoo).subscribe(responseListresult => {
                        console.log(responseListresult.resultList);
                        this.resultList = responseListresult.resultList;


                        loader.dismissAll();

                    })


                })
            }
        )


    }


    selectGoo() {

        /*alert(this.ssi);
        alert(this.selectedGoo);*/

        this.createLoading('리스트를 가지고 오는중..');
        this.loader.present();

        this.page=1;

        this.httpprovider.getAll(this.page, this.ssi, this.selectedGoo).subscribe(responseListresult => {
            console.log(responseListresult.resultList);
            this.resultList = responseListresult.resultList;
            this.loader.dismissAll();
        })
    }

    openInAppBrowser(pblancId) {

        window.open('https://m.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcView.do#detailPage?pblancId=' + pblancId, '_selft');
    }


    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        this.page++;

        this.httpprovider.getAll(this.page, this.ssi, this.selectedGoo).subscribe(responseListresult => {

            var fetchedList = [];
            fetchedList = responseListresult.resultList;

            if (fetchedList.length == 0) {

                this.presentToast('더이상 데이타가 없습니다')
            } else {

                for (var i = 0; i < fetchedList.length; i++) {
                    this.resultList.push(fetchedList[i]);
                }


            }

            infiniteScroll.complete();


        })


    }


    presentToast(message) {
        let toast = this.toastcontroller.create({
            message: message,
            duration: 1000,
            cssClass: 'toast001'
        });
        toast.present();
    }


}
