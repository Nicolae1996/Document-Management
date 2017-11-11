import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users/list/users.component';
import { UsersCreateComponent } from './users/create/create.component';
import { UsersEditComponent } from './users/edit/edit.component';
import { UsersDetailsComponent } from './users/details/details.component';
import { UsersEditrolesComponent } from './users/editroles/editroles.component';

const routes: Routes = [
    { path: 'users', component: UsersListComponent },
    { path: 'users/create', component: UsersCreateComponent },
    { path: 'users/edit/:id', component: UsersEditComponent },
    { path: 'users/details/:id', component: UsersDetailsComponent },
    { path: 'users/editroles/:id', component: UsersEditrolesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
