import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the BoardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BoardProvider {

    constructor(public http: Http) {
        console.log('Hello BoardProvider Provider');
    }


    url = "http://kyungjoon.ipdisk.co.kr:3000/board?$orderby=displayDate desc";

    url2 = "http://kyungjoon.ipdisk.co.kr:3000/board/";


    getBoardList() {

        return this.http.get(this.url).map(response => {
            return response.json();
        })
    }

    postBoard(name, content){

        var timeInMs = Date.now();

        let data = {
            name : name,
            content : content,
            displayDate : timeInMs
        }

        return this.http.post(this.url2, data).map(response=>{

            console.log(response);

            return response;
        })
    }

    deleteBoard(_id){

        return this.http.delete(this.url2 + _id).map(response=>{

            console.log(response);

            return response;
        })
    }

    updateBoard(selectItem){

        /*let date = {
            _id : item.id,
            name :'1234',
            content : '천재님이십ㄴ이fdslkf'
        }*/


        return this.http.put(this.url2+selectItem._id  , selectItem).map(response=>{

            console.log(response);

            return response;
        })
    }


}

interface UserResponse {
    login: string;
    bio: string;
    company: string;
}
