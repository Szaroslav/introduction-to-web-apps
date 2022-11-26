import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripData } from '../trip/trip.component';

@Component({
    selector: 'app-trip-create',
    templateUrl: './trip-create.component.html',
    styleUrls: ['./trip-create.component.scss']
})

export class TripCreateComponent {
    @Output() newTripEvent = new EventEmitter<TripData>();

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
        const newTrip: TripData = {
            name: c.name.value!,
            country: c.country.value!,
            startDate: new Date(c.startDate.value!).getTime(),
            endDate: new Date(c.endDate.value!).getTime(),
            unitPrice: parseFloat(c.unitPrice.value!),
            spotsNumber: parseInt(c.spotsNumber.value!),
            description: c.description.value!,
            previewImageURL: c.previewImageURL.value!,
        };

        this.newTripEvent.emit(newTrip);
        console.log(newTrip);
    }
}