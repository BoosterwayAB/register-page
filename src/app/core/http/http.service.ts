import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions, Http, URLSearchParams } from '@angular/http';


const local = 'http://localhost:8080/api/v1';
const test = 'https://boosterway-1521738141855.appspot.com/api/v1';
const local_ip = 'http://localhost:8080/api/v1';
const prod = 'https://appconnect.boosterway.net/api/v1';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private LocalIpAdres = local

  constructor(private httpClient: HttpClient, private http: Http) {

    

  }

  getUrl() {
    return this.LocalIpAdres
  }

  // Login user
  loginUser(user: object) {

    var url = this.LocalIpAdres + '/auth/login'
    let options = new RequestOptions({ headers: this.setHeader() });
    return this.http.post(url, user)

  }

  // Check if user have Stripe account
  async checkStripeConnection(userId: string) {

    let params = new URLSearchParams();
    params.append("userId", userId)

    let options = new RequestOptions({ headers: this.setHeader(), search: params });
    let url = this.LocalIpAdres + '/connect/status';

    let data: any;

    await this.http.get(url, options).toPromise().then(res => {data = res}, err => {data = err});
    return data

  }


  // Get profile
  async getProfile(userId: string) {

    let params = new URLSearchParams();
    params.append("userId", userId)

    let options = new RequestOptions({ headers: this.setHeader(), search: params });
    var url = this.LocalIpAdres + '/profile';

    var data: any;

    await this.http.get(url, options).toPromise().then(res => {data = res}, err => {data = err});
    return data

  }

  // Get user
  async getUser(userId: string) {

    let params = new URLSearchParams();
    params.append("userId", userId)

    let options = new RequestOptions({ headers: this.setHeader(), search: params });
    var url = this.LocalIpAdres + '/user';

    var data: any;

    await this.http.get(url, options).toPromise().then(res => {data = res}, err => {data = err});
    return data

  }






  // Create customer
  async createCustomer(email: string, organizerId: string) {
  
    let obj = {email: email, organizerId: organizerId}

    let options = new RequestOptions({ headers: this.setHeader()});
    var url = this.LocalIpAdres + '/connect/create';

    var data: any;

    await this.http.post(url, obj, options).toPromise().then(res => {data = res}, err => {data = err});
    return data

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
