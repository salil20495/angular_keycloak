import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy } from '@angular/common';

function initializeKeycloak(keycloak: KeycloakService) {
  console.log(`User is init`)
  return () =>
    keycloak.init({
      config: {
        clientId: 'leap-uat',
        realm: 'KocharTech',
        url: 'http://3.7.142.134:8080/auth/',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      bearerExcludedUrls: ['/assets'],
    });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, LocationStrategy],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
