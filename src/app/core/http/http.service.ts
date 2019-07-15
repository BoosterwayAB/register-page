import { Injectable } from '@angular/core';

const local = 'http://localhost:8080/api/v1';
const test = 'https://boosterway-1521738141855.appspot.com/api/v1';
const local_ip = 'http://192.168.1.224:8080/api/v1';
const prod = 'https://appconnect.boosterway.net/api/v1';

const url = test;

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor() {}

  getUrl() {
    return url;
  }
}
