import { Component, OnInit } from '@angular/core';
import { HttpService } from '../core/http/http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private http: HttpService) {

    console.log('home constructor')

  }

  ngOnInit() {

    console.log('home Initiazing')
    this.getUserStatus()

  }

  async getUserStatus(){

    let user = JSON.parse(localStorage.getItem('userdata'))
    console.log(user.userId)
    let res = await this.http.checkStripeConnection(user.userId)
    console.log(res)

  }
}
