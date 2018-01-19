import {Component, ViewChild} from '@angular/core';
import {
    Content, IonicPage, LoadingController, NavController, NavParams, Platform, PopoverController,
    ToastController
} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {AdMobPro} from "@ionic-native/admob-pro";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
    selector: 'page-blog-info',
    templateUrl: 'blog-info.html',
})
export class BlogInfoPage {
    @ViewChild(Content) content: Content;
    results: any = [];
    title: string;
    totalCount: number = 0;
    page: number = 1;
    totalPage = 0;
    selectedIndex = [];
    naver_url = "http://localhost:5000/imde_info_list?query=주택 청약 정보&page=";
    naver_url_remote = "https://checkout002-191623.appspot.com/imde_info_list?query=주택 청약 정보&page=";
    plxabayUri = 'https://pixabay.com/api/?key=7259916-f3ce173538d4a7f0dee3e23a0&category=buildings&image_type=photo&pretty=true&per_page=10&page='

    imageResult = [];
    saved_items: any = [];
    overlayHidden: boolean = true;
    placeholder = 'assets/imgs/placeholder-gray.png';
    isFirst : boolean = true;

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


    constructor(public navCtrl: NavController, public navParams: NavParams
        , public httpclient: HttpClient
        , private toastCtrl: ToastController
        , public loadingCtrl: LoadingController
        , public popoverCtrl: PopoverController
        , public platform: Platform
        , private admob: AdMobPro
        , private   iab: InAppBrowser) {

        if ( this.isFirst ){
            this.getAdMob();
            this.isFirst = false;
        }

        this.getFirstData();




    }

    getFirstData() {

        let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            spinner: 'dots',
            enableBackdropDismiss : true
        });
        loading.present();
        this.httpclient.get(this.naver_url_remote + this.page).subscribe((res1: any) => {


            this.httpclient.get(this.plxabayUri + this.page).subscribe((res: any) => {

                this.results = res1;
                this.imageResult = res.hits;
                console.log('###############' + JSON.stringify(this.imageResult));

                this.page = this.page + 1;
                loading.dismissAll();

            });


        },error2 => {
            alert(error2);
            loading.dismissAll();
        });

    }

    doRefresh(refresher) {
        this.page =1;

        this.getFirstData();

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 1000);
    }

    scrollToTop() {
        this.content.scrollToTop();
    }

    clickedFab() {
        this.scrollToTop();
    }

    doInfinite(infiniteScroll) {

        this.httpclient.get(this.naver_url_remote + this.page).subscribe((res1: any) => {

            this.httpclient.get(this.plxabayUri + this.page).subscribe((res: any) => {
                console.log('###############' + this.page);
                let receipesList = res1;
                for (let i = 0; i < receipesList.length; i++) {
                    this.results.push(receipesList[i]);
                }


                let ___imageResult = res.hits;
                for (let i = 0; i < ___imageResult.length; i++) {
                    this.imageResult.push(___imageResult[i]);
                }

                this.page = this.page + 1;
                infiniteScroll.complete();

            });


        })
    }


    clickedItem(url) {
        this.iab.create(url, '_blank', 'location=no,toolbar=no');
    }


    clickedHeart(item, index) {
        this.selectedIndex[index] = !this.selectedIndex[index]
        this.saved_items.push(item);
        this.presentToast();
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: '찜 되었습니다~~!',
            duration: 1500,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();

    }

}
