import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { I18nService } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  user = ''

  constructor(private router: Router, private i18nService: I18nService) {}

  ngOnInit() {
    let temp = JSON.parse(localStorage.getItem('userdata'))
    this.user = temp.name
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    console.log('Implement logout');
    localStorage.clear();
    this.router.navigate(['./login'])
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get userName(): string{
    return this.user
  }
}
