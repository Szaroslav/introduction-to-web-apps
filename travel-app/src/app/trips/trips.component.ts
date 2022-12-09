import { Component } from '@angular/core';
import { Trip } from './../trip/trip';
import trips from './trips.json';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})

export class TripsComponent {
    RATING_STARS_NUMBER = 5;
    trips: Trip[] = trips;
    filters = {countries: [], ratings: [], price: {lowest: null, highest: null}, date: {start: null, end: null}};
    maxUnitPrice = Number.MIN_SAFE_INTEGER;
    minUnitPrice = Number.MAX_SAFE_INTEGER;

    constructor() {
        const prices = trips.map(trip => trip.unitPrice);
        this.maxUnitPrice = Math.max(this.maxUnitPrice, ...prices);
        this.minUnitPrice = Math.min(this.minUnitPrice, ...prices);
    }

    deleteTrip(trip: Trip): void {
        this.trips = this.trips.filter(t => t !== trip);
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