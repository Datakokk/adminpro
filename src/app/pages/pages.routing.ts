import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {title: 'ProgressBar'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Settings acount'} },
            { path: 'charts1', component: Grafica1Component, data: {title: 'Chart#1'} },
            { path: 'profile', component: ProfileComponent, data: {title: 'User profile'} },
            { path: 'promises', component: PromisesComponent , data: {title: 'Promises'} },
            { path: 'rxjs', component: RxjsComponent , data: {title: 'Rxjs'} },
    
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
