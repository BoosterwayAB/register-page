import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions, Http } from '@angular/http';


const local = 'http://localhost:8080/api/v1';
const test = 'https://boosterway-1521738141855.appspot.com/api/v1';
const local_ip = 'http://192.168.1.224:8080/api/v1';
const prod = 'https://appconnect.boosterway.net/api/v1';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private LocalIpAdres = test

  constructor(private httpClient: HttpClient, private http: Http) {



  }

  getUrl() {
    return this.LocalIpAdres
  }

  loginUser(user: object) {

    var url = this.LocalIpAdres + '/auth/login'
    let options = new RequestOptions({ headers: this.setHeader() });
    return this.http.post(url, user)

  }

  private getToken() {

    return localStorage.getItem("authtoken")

  }

  // Sets header for request
  setHeader() {

    var header = null;
    var authType = 'local' //localStorage.get("authType")

    if (authType == "local") header = new Headers({ 'Content-Type': 'application/json', 'Authorization': "JWT " + this.getToken() });

    return header

  }

}
