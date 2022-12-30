import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginGuard } from './authentication/login.guard';
import { TripsManagerGuard } from './trips-manager.guard';
import { AdministratorGuard } from './administrator.guard';

const routes: Routes = [{
    path: 'account',
    children: [
        { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
        { path: 'admin/dashboard', component: DashboardComponent, canActivate: [ AdministratorGuard ] },
        { path: 'manager/dashboard', component: DashboardComponent, canActivate: [ TripsManagerGuard ] },
        { path: 'login', component: SignInComponent, canActivate: [ LoginGuard ] },
        { path: 'register', component: SignUpComponent, canActivate: [ LoginGuard ] }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AccountRoutingModule {}