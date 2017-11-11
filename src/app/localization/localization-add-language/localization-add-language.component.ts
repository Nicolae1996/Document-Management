import { Component, OnInit } from '@angular/core';
import { ControlBase } from "../../shared/forms/control-base";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { ActionsService } from "../../services/actions.service";
import { ModalsService } from "../../services/modals.service";
import { ControlTextbox } from "../../shared/forms/control-textbox";

@Component({
  selector: 'app-localization-add-language',
  templateUrl: './localization-add-language.component.html',
  styleUrls: ['./localization-add-language.component.scss']
})
export class LocalizationAddLanguageComponent implements OnInit {

  public errors: string[] = [];
  public controls: Array<ControlBase<any>>;
  public model: any = [];

  constructor(private authHttp: AuthHttp,
    private actionService: ActionsService,
    public modalsService: ModalsService) {
  }

  /**
     * Implements initialization for this component
     */
  ngOnInit() {
    const controls: Array<ControlBase<any>> = [
      new ControlTextbox({
        key: "identifier",
        label: "Identificator",
        placeholder: '',
        value: '',
        type: 'textbox',
        required: true,
        order: 1
      }),
      new ControlTextbox({
        key: "name",
        label: "Name",
        placeholder: '',
        value: '',
        type: 'textbox',
        required: true,
        order: 2
      })
    ];
    this.controls = controls;
  }
  public create(model: any): void {
    this.actionService.Create(model, "api/Localization/AddLanguage").subscribe(
      (res: any) => {
        console.log(res.json());
        let modelresult: any = res.json();

        if (modelresult.is_success) {
          this.modalsService.modalInfo("success", "Languages was created!");
        } else {
          this.modalsService.modalInfo("error", modelresult.error_keys);
        }
      },
      (error: any) => {
        this.modalsService.modalInfo("error", error.toString());
      });
  };
}
