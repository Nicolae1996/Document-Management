import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { Config } from "../../config";
import { AuthHttp } from "angular2-jwt/angular2-jwt";


@Injectable()
export class ContentService {

    constructor(public dataService: DataService, private auth: AuthHttp) { }

    public get(lang?: string): any {
        return this.dataService.get(Config.LanguageService + "/api/Localization/GetTranslations/" + lang);
    }
}
