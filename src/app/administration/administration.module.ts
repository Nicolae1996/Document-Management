import { NgModule } from '@angular/core';
import { AdministrationRoutingModule } from "./administration.routing.module";
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './users/list/users.component';
import { UsersCreateComponent } from './users/create/create.component';
import { UsersEditComponent } from './users/edit/edit.component';
import { UsersDetailsComponent } from './users/details/details.component';
import { UsersEditrolesComponent } from './users/editroles/editroles.component';

@NgModule({
  imports: [
    AdministrationRoutingModule,
    SharedModule
  ],
  declarations: [
    UsersListComponent,
    UsersCreateComponent,
    UsersEditComponent,
    UsersDetailsComponent,
    UsersEditrolesComponent
  ]
})
export class AdministrationModule { }
