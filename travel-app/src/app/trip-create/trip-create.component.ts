import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Trip } from '../trip/trip';

@Component({
    selector: 'app-trip-create',
    templateUrl: './trip-create.component.html',
    styleUrls: ['./trip-create.component.scss']
})

export class TripCreateComponent {
    @Output() newTripEvent = new EventEmitter<Trip>();

    createForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        unitPrice: new FormControl('', [Validators.required]),
        spotsNumber: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        previewImageURL: new FormControl('', [Validators.required])
    });

    onSubmit(): void {
        const c = this.createForm.controls;
        const newTrip = new Trip(
            c.name.value!,
            c.country.value!,
            c.startDate.value?.valueOf(),
            c.endDate.value?.valueOf(),
            parseFloat(c.unitPrice.value!),
            parseInt(c.spotsNumber.value!),
            0,
            c.description.value!,
            c.previewImageURL.value!,
        );

        this.newTripEvent.emit(newTrip);
    }
}