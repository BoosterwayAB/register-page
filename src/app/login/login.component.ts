import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AuthenticationService } from '../core/http/authentication.service';

import { environment } from '@env/environment';
import { Logger, I18nService, untilDestroyed } from '@app/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  version: string = environment.version;
  error: string | undefined; 
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private auth: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() { }

  ngOnDestroy() { }

  async login() {

    this.isLoading = true

    let resp = await this.auth.login(this.loginForm.value)
    let json_data = resp.json()

    if (resp.status == 200) {

      console.log(json_data)

      if (json_data.token) {
        localStorage.setItem('authtoken', json_data.token)
        localStorage.setItem('userdata', JSON.stringify(json_data))
        this.router.navigate(['./home'])
      } else {
        this.getErrorMsg(json_data.error)
      }

      this.stopLoading()

    } else {

      this.getErrorMsg(json_data.code)
      this.stopLoading()

    }

  }

  getErrorMsg(code: any){

    let error_msg;
      switch (code) {
        case 0:
          error_msg = 'Din e-mail finns inte registrerad hos oss.';
          break;
        case 1:
          error_msg = 'Ditt konto har blivit avaktiverat, vänligen kontakta support@boosterway.com för mer info.';
          break;
        case 2:
          error_msg = 'Ditt konto har blivit avaktiverat, vänligen kontakta support@boosterway.com för mer info.';
          break;
        case 3:
          error_msg = 'Lösenordet matchar inte din valda e-mail';
          break;
        default:
          error_msg = 'Något gick fel när vi försökte logga in dig. Vänligen försök igen eller kontakta support@boosterway.com vid frågor.';

      }
      console.log(error_msg)

      return error_msg
  }

  stopLoading() {
    this.isLoading = false
  }

  toRegister() {
    this.isLoading = true;

    this.router.navigate(['/register'], { replaceUrl: true });

    this.isLoading = false;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
