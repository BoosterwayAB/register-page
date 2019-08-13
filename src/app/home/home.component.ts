import { Component, OnInit } from '@angular/core';
import { HttpService } from '../core/http/http.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthenticationService } from '../core/http/authentication.service';

import { environment } from '@env/environment';
import { Logger, I18nService, untilDestroyed } from '@app/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = false;

  user: any;
  stripe: any;

  editForm = false;
  stripeUser = false;

  profileForm!: FormGroup;

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private auth: AuthenticationService
  ) {

    console.log('home constructor')

    this.createForm();

  }

  async ngOnInit() {

    this.isLoading = !this.isLoading
    await this.getUserStatus()
    this.isLoading = false;

  }

  async getUserStatus() {

    let userId = JSON.parse(localStorage.getItem('userdata')).userId
    console.log(JSON.parse(localStorage.getItem('userdata')))
    console.log('test')
    let stripeData = await this.http.checkStripeConnection(userId)
    stripeData = JSON.parse(stripeData._body)
    console.log(stripeData)

    if(stripeData.status == 'connected'){
      console.log('Good boi')
      this.stripeUser = true;

    } else {
      console.log('Bad boi')
    }

    let userData = await this.http.getProfile(userId)

    this.user = JSON.parse(userData._body)
    //this.stripe = JSON.parse(stripeData._body)

    console.log(this.user)
    console.log(this.stripe)

    this.profileForm.controls['password'].setValue('passwordpassword')
    this.profileForm.controls['name'].setValue(this.user.name)
    this.profileForm.controls['email'].setValue(this.user.email)

  }

  public async createCustomer(){
    console.log('create')
    let stripeData = await this.http.createCustomer(this.user.email, this.user.organizer)
    console.log(stripeData)

  }

  private createForm() {
    this.profileForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  editProfile(){
    console.log('hej')
  }

  lock(){

    this.editForm = !this.editForm

    console.log(this.profileForm.disabled)

  }
}
