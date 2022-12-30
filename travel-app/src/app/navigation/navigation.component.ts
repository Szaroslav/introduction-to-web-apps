import { Component } from '@angular/core';
import { AuthService } from '../account/authentication/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
    constructor(private authService: AuthService) {}

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    getUsername(): string | null {
        return this.authService.username;
    }

    getPermissionsLevel(): string | null {
        console.log(this.authService.permissionsLevel)
        return this.authService.permissionsLevel;
    }

    toggle(button: Element): void {
        button.classList.toggle('clicked');
    }
}
