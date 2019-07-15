import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Headers, RequestOptions, Http } from '@angular/http';

let url = '';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpService: HttpService, private http: Http) {

    url = this.httpService.getUrl()

  }

  async login(data: Object) {

    console.log('auth login starts')

    let user = {
      email: 'sebastian@boosterway.com',
      password: 'Arne2218'
    }

    var _url = url + '/auth/login'
    let login_data: any;

    await this.http.post(_url, user).toPromise().then(
      res => { // Success
        login_data = res

      },
      err => { // Error
        login_data = err
      }
    );

    return login_data

  }

}
