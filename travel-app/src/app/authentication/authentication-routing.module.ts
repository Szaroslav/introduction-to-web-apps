import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [{
    path: 'account',
    children: [
        { path: 'dashboard', component: SignInComponent, canActivate: [ AuthGuard ] },
        { path: 'login', component: SignInComponent, canActivate: [ LoginGuard ] },
        { path: 'register', component: SignUpComponent, canActivate: [ LoginGuard ] }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthenticationRoutingModule { }