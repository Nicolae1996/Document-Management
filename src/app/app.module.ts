import { NgModule, Injectable, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, JsonpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { ActionsService } from "./services/actions.service";
import { ModalsService } from "./services/modals.service";
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// angular2-jwt config for JiT and AoT compilation.
import { AuthHttp, AuthConfig } from 'angular2-jwt';

//for server publication
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//localization 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ApiTranslationLoader } from './shared/services/api-translation-loader.service';
// Set tokenGetter to use the same storage in AuthenticationService.Helpers.
export function getAuthHttp(http: Http) {
    return new AuthHttp(new AuthConfig({
        noJwtError: true,
        tokenGetter: (() => localStorage.getItem("id_token"))
    }), http);
}
@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        JsonpModule,
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: ApiTranslationLoader } })
    ],
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    exports: [
    ],
    providers: [
        Title,
        AuthGuard,
        AuthenticationService,
        ActionsService,
        ModalsService,
        {
            provide: AuthHttp,
            useFactory: getAuthHttp,
            deps: [Http]
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }

    ], 
    bootstrap: [AppComponent]
})
export class AppModule { }
