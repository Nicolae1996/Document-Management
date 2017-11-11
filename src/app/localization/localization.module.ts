import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LocalizationRoutingModule } from "./localization-routing.module";
import { LocalizationListComponent } from './localization-list/localization-list.component';
import { LocalizationCreateKeyComponent } from './localization-create-key/localization-create-key.component';
import { LocalizationEditKeyComponent } from './localization-edit-key/localization-edit-key.component';
import { LocalizationAddLanguageComponent } from './localization-add-language/localization-add-language.component';

@NgModule({
  imports: [
    SharedModule,
    LocalizationRoutingModule
  ],
  declarations: [LocalizationListComponent, LocalizationCreateKeyComponent, LocalizationEditKeyComponent, LocalizationAddLanguageComponent]
})
export class LocalizationModule { }
