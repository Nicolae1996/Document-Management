//for use components from angular
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
//for specify title of page
import { Title } from '@angular/platform-browser';
//for use router-outlet
import { Router } from '@angular/router';
//for use globals variabiles
import { Observable } from 'rxjs/Observable';
//for use Translations
import { TranslateService } from '@ngx-translate/core';

//for use properties of authentification service
import { AuthenticationService } from './services/authentication.service';
//model of user
import { User } from './models/users/user';
//for utilize jquery
declare var $: any;
import { ApiTranslationLoader } from './shared/services/api-translation-loader.service';
import { Config } from "./config";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
//import structure of menu
import { Menu } from './menu';
import { BehaviorSubject } from "rxjs";
//specify component
@Component({
    //specify selector for use in index.html or other templates
    selector: 'app-component',
    //specify html template
    templateUrl: './app.component.html'
})
//
export class AppComponent implements OnInit, AfterViewInit {
    MenuMode: string = Menu.MenuMode;
    menus: any = Menu.items;
    signedIn: Observable<boolean>;
    //name of user fro UI
    name: string;
    signed: boolean;
    //for UI
    language: string;
    public languages = [];
    /**
     * 
     * @param elementRef 
     * add for attach js files
     * @param title 
     * for specify title of page
     * @param authenticationService 
     * for authentification
     * @param router 
     * for work with localstorage
     * @param translation 
     * for initialize translation service 
     */
    constructor(
        public translate: TranslateService,
        private elementRef: ElementRef,
        public title: Title,
        private authenticationService: AuthenticationService,
        public translation: TranslateService,
        private router: Router,
        public translationService: ApiTranslationLoader,
        public auth: AuthHttp) {

        //extract value from file config and include it in global
        switch (Menu.MenuMode) {
            case 'vertical': {
                this.authenticationService.ModeMenuGlobal.next('vertical');
            } break;
            case 'horizontal': {
                this.authenticationService.ModeMenuGlobal.next('horizontal');
            } break;
        }
        //extract value from global
        this.authenticationService.ModeMenuGlobal.subscribe((value: any) => {
            this.MenuMode = value;
        });
        //declare laguages
        this.auth.get(Config.data + "/api/Localization/GetAvailablesLanguages").subscribe((res: any) => {
            let model: any = res.json();
            let langs = [];
            for (let i in model.result) {
                this.languages.push({
                    locale: model.result[i].locale,
                    description: model.result[i].description
                });
                langs.push(model.result[i].locale);
            }
            this.translate.addLangs(langs);
        },
            (error: any) => {
                console.log(error);
            });
        this.languages = [];
        //add languages in service
        //set default language
        translate.setDefaultLang('en');
        let getFromLocal = localStorage.getItem("pigd-translate");
        if (getFromLocal === null) {
            translate.use('en');
            this.language = "en";
        } else {
            translate.use(getFromLocal);
            this.language = getFromLocal;
        }

        router.events.subscribe((val) => {
            /* Call resize window */
            $(window).resize();
            /* End call resize window */
            this.signedIn.subscribe((value) => this.signed = value)
            if (this.signed) {
                $("#notlogged").css("display", "none");
            }
        });
    }
    /**
     * for do actions after html template are initialized
     * Include actions for html template with jquery
     */
    async ngAfterViewInit() {
        await this.loadScript("assets/js/theme/actions.js")
    }
    /**
     * Set selected language in local storage
     * Use Selected Language in system
     * @param lang 
     */
    public setLang(lang: any) {
        this.language = lang.locale;
        this.translation.use(lang.locale);
        localStorage.setItem("pigd-translate", lang.locale);
    }

    /**
     * On component initialization
     */
    ngOnInit() {
        this.title.setTitle('ST.Demo');
        this.signedIn = this.authenticationService.isSignedIn();
        this.authenticationService.userChanged().subscribe(
            (user: User) => {
                this.name = user.userName;
            });

        // Optional strategy for refresh token through a scheduler.
        this.authenticationService.startupTokenRefresh();
    }

    /**
     * On exit when if clicked from html template
     * Signout in service
     * Redirect to signin page
     */
    signout(): void {
        this.authenticationService.signout();
        location.assign(location.origin + "/account/signin");
    }
    /**
         * Load async scripts
         * @param scriptUrl 
         * url of script
         */
    private loadScript(scriptUrl: string) {
        return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script')
            scriptElement.src = scriptUrl
            scriptElement.onload = resolve
            document.body.appendChild(scriptElement)
        })
    }
}
