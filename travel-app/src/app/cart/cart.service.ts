import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from './../trip/trip';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private trips = new BehaviorSubject<Trip[]>([]);
    trips$ = this.trips.asObservable();

    constructor() {}

    addNewTrip(trip: Trip) {
        this.trips.next(this.trips.getValue().concat(trip));
        console.log(this.trips);
    }

    removeTrip(trip: Trip) {
        this.trips.next(this.trips.getValue().filter(t => t !== trip));
        console.log(this.trips);
    }
}