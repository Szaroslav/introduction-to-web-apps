import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Trip } from '../trip/trip';
import { TripsService } from './../trips/trips.service';

@Component({
    selector: 'app-trip-create',
    templateUrl: './trip-create.component.html',
    styleUrls: ['./trip-create.component.scss']
})

export class TripCreateComponent implements OnInit {
    @Output() newTripEvent = new EventEmitter<Trip>();
    private lastId!: number;

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

    constructor(private tripsService: TripsService) {}

    ngOnInit(): void {
        this.tripsService.trips$.subscribe(trips => this.lastId = trips.map(t => t.id).sort()[trips.length - 1]);
    }

    onSubmit(): void {
        const c = this.createForm.controls;
        const newTrip = new Trip(
            this.lastId + 1,
            c.name.value!,
            c.country.value!,
            c.startDate.value?.valueOf(),
            c.endDate.value?.valueOf(),
            parseFloat(c.unitPrice.value!),
            parseInt(c.spotsNumber.value!),
            0,
            c.description.value!,
            {thumbnailURL: c.previewImageURL.value!, sliderURLs: [c.previewImageURL.value!]},
        );

        this.newTripEvent.emit(newTrip);
    }
}