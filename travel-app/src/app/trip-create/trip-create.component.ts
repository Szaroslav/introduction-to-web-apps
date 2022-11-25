import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-trip-create',
    templateUrl: './trip-create.component.html',
    styleUrls: ['./trip-create.component.scss']
})

export class TripCreateComponent {
    createForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required])
    });

    onSubmit(): void {
        console.log('?');
        console.log(this.createForm.controls);
    }
}