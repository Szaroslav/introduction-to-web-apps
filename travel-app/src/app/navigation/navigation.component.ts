import { Component } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
    toggle(button: Element): void {
        button.classList.toggle('clicked');
    }
}
