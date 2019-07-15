import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { I18nService } from './i18n.service';
import { AuthguardService } from './authentication/authguard.service';
import { AuthenticationService } from './http/authentication.service';
import { HttpService } from './http/http.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule, RouterModule],
  providers: [
    I18nService,
    AuthguardService,
    AuthenticationService,
    HttpService,
    {
      provide: HttpClient
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
