import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
//for table
import { DynamicTableComponent } from './templates/table/table-dinamic-component';
//for pages title
import { DynamicTitleComponent } from "./templates/titlePage";
//for pagination
import { PaginationDirective } from './pagination.component';
//for forms
import { DynamicFormComponent } from './forms/dynamic-form.component';
import { DynamicFormControlComponent } from './forms/dynamic-form-control.component';
import { ErrorMessageComponent } from './forms/error-message.component';
import { ErrorSummaryComponent } from './forms/error-summary.component';
import { FormControlService } from './forms/form-control.service';
//for files upload
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from "./files/file-upload";
//for translatiuon
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from './services/content.service';
import { DataService } from './services/data.service';
import { ApiTranslationLoader } from './services/api-translation-loader.service';
//modals
import { ModalComponent } from "./templates/info-modal/info.modal";
//tabs
import { Tabs } from "./templates/tabs/tab.component";
import { Tab } from "./templates/tabs/tab.sub.component";

const sharedModules: any[] = [
    HttpModule,
    JsonpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FileUploadModule,
    TranslateModule
];
const sharedtemplates: any[] = [
    // templates for forms
    DynamicTableComponent,
    DynamicTitleComponent,
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    ErrorMessageComponent,
    FileUploadComponent,
    ModalComponent,
    Tabs,
    Tab
];
@NgModule({
    imports: sharedModules,

    exports: [
        sharedModules,
        sharedtemplates
    ],
    declarations: [
        sharedtemplates,
        PaginationDirective
    ]
})

export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                FormControlService,
                ContentService,
                DataService,
                ApiTranslationLoader
            ]
        };
    }
}
