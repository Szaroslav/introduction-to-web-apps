import { Component, OnInit } from '@angular/core';
import { Trip } from './../trip/trip';
import { TripsService } from './trips.service';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})

export class TripsComponent implements OnInit {
    RATING_STARS_NUMBER = 5;
    trips: Trip[] = [];
    filters = {countries: [], ratings: [], price: {lowest: null, highest: null}, date: {start: null, end: null}};
    maxUnitPrice = Number.MIN_SAFE_INTEGER;
    minUnitPrice = Number.MAX_SAFE_INTEGER;

    constructor(private tripsService: TripsService) {}

    ngOnInit(): void {
        this.tripsService.getTrips();

        this.tripsService.trips$.subscribe(trips => {
            this.trips = trips
            
            const prices = this.trips.map(trip => trip.unitPrice);
            this.maxUnitPrice = Math.max(Number.MIN_SAFE_INTEGER, ...prices);
            this.minUnitPrice = Math.min(Number.MAX_SAFE_INTEGER, ...prices);
        });
    }

    addTrip(trip: Trip): void {
        this.trips.push(trip);
    }

    onFilter(values: any): void {
        this.filters = values;
        // this.filtersWithoutCountries = Object.assign(this.filtersWithoutCountries, this.filters);
        // this.filtersWithoutCountries.countries = [];
    }
}