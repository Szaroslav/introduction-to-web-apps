import { Component } from '@angular/core';
import { AuthService } from './../authentication/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
    constructor(private authService: AuthService) {}

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated;
    }

    toggle(button: Element): void {
        button.classList.toggle('clicked');
    }
}
