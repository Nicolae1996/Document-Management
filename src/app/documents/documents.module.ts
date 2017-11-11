import { NgModule } from '@angular/core';
import { DocumentsIndexComponent } from './documents-index/documents-index.component';
import { SharedModule } from '../shared/shared.module';
import { DocumentsRoutingModule } from "./documents.routing.module";
//file tree 
import { TreeModule } from '../shared/file-tree/index';

@NgModule({
  imports: [
    DocumentsRoutingModule,
    SharedModule,
    TreeModule
  ],
  declarations: [
    DocumentsIndexComponent
  ]
})
export class DocumentsModule { }
