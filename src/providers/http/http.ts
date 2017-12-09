import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

    url2 = "http://104.196.106.6:8080/";
    /*    url2 = "http://localhost:8080/";*/

    ulr____ = "http://35.194.71.159:8080/";

    constructor(public http: Http) {
        console.log('Hello HttpProvider Provider');
    }

    getAll(pageIndex, srchbrtcCode, selectedGoo) {

        return this.http.post(this.url2 + "lh/lhListToJson?pageIndex=" + pageIndex + "&srchbrtcCode=" + srchbrtcCode
            + "&srchsignguCode=" + selectedGoo, null).map(response => {


            return response.json();
        })
    }


    getGooList(srchbrtcCode) {
        return this.http.get(this.url2 + "lh/gettGooListToJson?srchbrtcCode=" + srchbrtcCode).map(response => {

            return response.json();
        })
    }

    getDetail(pblancId) {

        console.log("pblancId-->" + pblancId);
        return this.http.get(this.url2 + "lh/lhDetailToJson?pblancId=" + pblancId).map(response => {


            return response.json();
        })
    }

    getSupplyDetail(pblancId) {
        console.log("pblancId-->" + pblancId);
        return this.http.get(this.url2 + "lh/suplyListToJson?pblancId=" + pblancId).map(response => {


            return response.json();
        })

    }


}
