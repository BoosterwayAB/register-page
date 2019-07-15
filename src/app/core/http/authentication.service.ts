import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

let _url = '';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private url: HttpService) {
    _url = this.url.getUrl();
  }

  async getTest(data: Object) {
    console.log('TESTING');
    console.log(data);
    console.log(this.url.getUrl());

    this.httpClient
      .get(_url, {
        params: {
          email: 'sebastian@boosterway.com',
          password: 'Arne2218'
        },
        observe: 'response'
      })
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
  }
}
