import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    { path: 'documents', loadChildren: './documents/documents.module#DocumentsModule', canActivate: [AuthGuard] },
    { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule', canActivate: [AuthGuard] },
    { path: 'localization', loadChildren: './localization/localization.module#LocalizationModule', canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
