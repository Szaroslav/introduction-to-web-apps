import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TripData } from '../trip/trip.component';

@Component({
    selector: 'app-trips-filter',
    templateUrl: './trips-filter.component.html',
    styleUrls: ['./trips-filter.component.scss']
})

export class TripsFilterComponent implements OnInit {
    @Input() RATING_STARS_NUMBER!: number;
    @Input() trips!: TripData[];
    @Input() price!: {lowest: number, highest: number};
    @Output() filterEvent = new EventEmitter<any>();

    countries: string[] = [];
    ratings: number[] = [];
    
    filterForm = new FormGroup({
        countries: new FormControl(),
        ratings: new FormControl(),
        price: new FormGroup({
            lowest: new FormControl(),
            highest: new FormControl()
        }),
        date: new FormGroup({
            start: new FormControl(),
            end: new FormControl()
        }),
    });

    ngOnInit(): void {
        this.ratings = Array(this.RATING_STARS_NUMBER)
            .fill(0)
            .map((_, i) => (i + 1));
        this.countries = this.trips.map(t => t.country).filter((c, i, countries) => countries.indexOf(c) === i);
        this.filterForm.controls.price.controls.highest.setValue(this.price.highest);
        
        this.filterForm.valueChanges.subscribe(values => {
            this.filterEvent.emit(values);
        });
    }
}