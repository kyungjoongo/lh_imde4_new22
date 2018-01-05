import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpProvider {

    url2 = "http://35.189.188.152:8080/";
    /*    url2 = "http://localhost:8080/";*/

    constructor(public http: Http, public httpClient: HttpClient) {
        console.log('Hello HttpProvider Provider');
    }

    shUrl = 'http://kyungjoon.ipdisk.co.kr:5000/getRentalHouseList?gooCode=';


    getShRentalList(pageIndex, srchbrtcCode = 11, gooCode) {

        return this.http.get(this.shUrl + gooCode).map(response => {
            return response.json();

        })
    }


    getAll(pageIndex, srchbrtcCode, selectedGoo):Observable<any> {
        return this.httpClient.post(this.url2 + "lh/lhListToJson?pageIndex=" + pageIndex + "&srchbrtcCode=" + srchbrtcCode
            + "&srchsignguCode=" + selectedGoo, null);
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
