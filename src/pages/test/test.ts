import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {BoardProvider} from "../../providers/board/board";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-test',
    templateUrl: 'test.html',
})
export class TestPage {

    constructor(public navCtrl: NavController
        , public boardprovider: BoardProvider
        , public loadingCtrl: LoadingController
        , public navParams: NavParams) {

        this.getBoardList();
    }


    result = [];
    name: String = '';
    content: String = '';
    item = [];

    name2 = [];
    content2: String;

    getBoardList() {

        this.boardprovider.getBoardList().subscribe(response => {

            console.log(response);
            this.result = response;

        })

    }

    valuechange() {


    }

    saveContent() {

        //alert(this.name +" "+  this.content);


        let loader = this.loadingCtrl.create({
            content: 'Loading..'
        });

        loader.present();
        this.boardprovider.postBoard(this.name, this.content).subscribe(res => {

            this.getBoardList();

            loader.dismiss();


        })


    }

    deleleItem(_id) {

        this.boardprovider.deleteBoard(_id).subscribe(res => {
            this.getBoardList();
        })
    }

    updateItem(selectItem) {


        let loader = this.loadingCtrl.create({
            content: 'Loading..'
        });

        loader.present();


        this.boardprovider.updateBoard(selectItem).subscribe(res => {
            this.getBoardList();

            loader.dismiss();

        })
    }


}
