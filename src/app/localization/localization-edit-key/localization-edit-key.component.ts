import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ActionsService } from "../../services/actions.service";
import { ControlTextbox } from "../../shared/forms/control-textbox";
import { ControlBase } from "../../shared/forms/control-base";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { ModalsService } from "../../services/modals.service";

@Component({
  selector: 'app-localization-edit-key',
  templateUrl: './localization-edit-key.component.html',
  styleUrls: ['./localization-edit-key.component.scss']
})
export class LocalizationEditKeyComponent implements OnInit {

  public errors: string[] = [];
  public controls: Array<ControlBase<any>> = [];
  public model: languageEdit;

  constructor(private authHttp: AuthHttp,
    private router: Router,
    private actionService: ActionsService,
    private route: ActivatedRoute,
    public modalsService: ModalsService) {
    this.route.params.subscribe(params => {
      this.model = JSON.parse(params["id"]) as languageEdit;
      this.controls.push(
        new ControlTextbox({
          key: 'Key',
          label: 'Key',
          placeholder: '',
          value: this.model.Key.toString(),
          type: 'textbox',
          required: true,
          order: 1
        })
      );
      let model = this.model.LocalizedStrings;
      let index = 1;
      for (let key in model) {
        this.controls.push(
          new ControlTextbox({
            key: key.toString(),
            label: key.toString(),
            placeholder: '',
            value: model[key].toString(),
            type: 'textbox',
            required: true,
            order: ++index
          })
        );
      }


    });
  }
  /**
   * Implements initialization for this component
   */
  ngOnInit() {

  }
  public update(model: any): void {
    let finalModel: languageEdit = this.model;
    finalModel.Key = model['Key'];
    let index = 0;
    finalModel.LocalizedStrings = model;
    this.actionService.EditPost(finalModel, "/api/Localization/EditKey")
      .subscribe(
      (res: any) => {
        if (res.is_success) {
          this.modalsService.modalInfo("success", "Key was edited!");
        }
      },
      (error: any) => {
        this.errors = error;
        this.modalsService.modalInfo("error", error.toString());
      });
  };

}
/**
 * Model for language edit
 */
interface languageEdit {
  Key: any;
  LocalizedStrings: any;
  Languages: any;
}
