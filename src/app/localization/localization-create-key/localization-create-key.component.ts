import { Component, OnInit, AfterViewInit } from '@angular/core';
//for form
import { ControlBase } from '../../shared/forms/control-base';
import { ControlTextbox } from '../../shared/forms/control-textbox';
import { ControlCheckbox } from '../../shared/forms/control-checkbox';
//actions service for reseive data
import { ActionsService } from "../../services/actions.service";
import { Router } from "@angular/router";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { Config } from "../../config";
//for use Translations
import { TranslateService } from '@ngx-translate/core';
//use models
import { LocalizationCreateModel } from "../../models/localization/model";
import { ModalsService } from '../../services/modals.service';

@Component({
    selector: 'app-localization-create-key',
    templateUrl: './localization-create-key.component.html',
    styleUrls: ['./localization-create-key.component.scss']
})
export class LocalizationCreateKeyComponent implements OnInit, AfterViewInit {

    public errors: string[] = [];
    public controls: Array<ControlBase<any>>;
    public model: any = [];

    constructor(private authHttp: AuthHttp,
        private router: Router,
        private actionService: ActionsService,
        public translate: TranslateService,
        public modalsService: ModalsService) {
    }
    /**
     * Implements initialization for this component
     */
    ngOnInit() {
        const controls: Array<ControlBase<any>> = [
            new ControlTextbox({
                key: "NewKey",
                label: "NewKey",
                placeholder: '',
                value: '',
                type: 'textbox',
                required: true,
                order: 1
            })
        ];
        this.model = this.translate.getLangs();
        for (let key in this.model) {
            controls.push(
                new ControlTextbox({
                    key: this.model[key],
                    label: this.model[key],
                    placeholder: '',
                    value: '',
                    type: 'textbox',
                    order: key + 1
                })
            );
        }
        this.controls = controls;
    }
    public create(model: any): void {
        let values = [];
        let i: number = 1;
        let key = model["NewKey"];
        delete model["NewKey"];
        let final = new LocalizationCreateModel(key, model);

        this.actionService.Create(final, "api/Localization/AddKey")
            .subscribe(
            () => {
                this.modalsService.modalInfo("succes", "Key was created!");
            },
            (error: any) => {
                this.errors = error;
                this.modalsService.modalInfo("error", error.toString());
            });
    };
    ngAfterViewInit() {
    }
}
