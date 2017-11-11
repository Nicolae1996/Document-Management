import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizationListComponent } from './localization-list/localization-list.component';
import { LocalizationCreateKeyComponent } from './localization-create-key/localization-create-key.component';
import { LocalizationEditKeyComponent } from './localization-edit-key/localization-edit-key.component';
import { LocalizationAddLanguageComponent } from './localization-add-language/localization-add-language.component';

const routes: Routes = [
    { path: '', component: LocalizationListComponent },
    { path: 'create', component: LocalizationCreateKeyComponent},
    { path: 'edit/:id', component: LocalizationEditKeyComponent},
    { path: 'addlanguage', component: LocalizationAddLanguageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocalizationRoutingModule { }
