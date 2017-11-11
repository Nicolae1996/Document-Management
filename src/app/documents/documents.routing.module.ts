import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsIndexComponent } from "./documents-index/documents-index.component";

const routes: Routes = [
    { path: '', component: DocumentsIndexComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentsRoutingModule { }
