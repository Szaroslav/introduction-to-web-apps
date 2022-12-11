import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Trip, TripSpots, Review } from '../trip/trip';
import { CartService } from './../cart/cart.service';
import trips from './trips.json';

@Injectable({
    providedIn: 'root'
})

export class TripsService {
    private trips = new BehaviorSubject<Trip[]>(trips);
    trips$ = this.trips.asObservable();
    private spotsNumbers = Array(trips.length).fill(0).map((_, i) => new BehaviorSubject<TripSpots>(new TripSpots(0, trips[i].spotsNumber - trips[i].purchasedSpotsNumber)));
    spotsNumbers$ = this.spotsNumbers.map(s => s.asObservable());

    constructor(private cartService: CartService) {}

    getTrip(idx: number): Trip {
        return idx >= 0 && idx < this.trips.getValue().length ? this.trips.getValue()[idx] : new Trip();
    }

    getTripsLength() {
        return this.trips.getValue().length;
    }

    setTrip(idx: number, newTrip: Trip): void {
        if (idx < 0 || idx >= this.trips.getValue().length)
            return;

        this.trips.getValue()[idx] = newTrip;
        this.trips.next(this.trips.getValue());
    }

    bookTrip(idx: number): void {
        if (idx < 0 || idx >= this.trips.getValue().length)
            return;

        const sn = this.spotsNumbers[idx].getValue();
        this.spotsNumbers[idx].next(new TripSpots(Math.min(sn.reserved + 1, sn.available), sn.available));
        this.cartService.addNewTrip(this.trips.getValue()[idx]);
    }

    unbookTrip(idx: number): void {
        if (idx < 0 || idx >= this.trips.getValue().length)
            return;
        
        const sn = this.spotsNumbers[idx].getValue();
        this.spotsNumbers[idx].next(new TripSpots(Math.max(sn.reserved - 1, 0), sn.available));
        this.cartService.removeTrip(this.trips.getValue()[idx]);
    }

    deleteTrip(idx: number): void {
        if (idx < 0 || idx >= this.trips.getValue().length)
            return;

        this.trips.next(this.trips.getValue().filter((_, i) => i !== idx));
        this.spotsNumbers = this.spotsNumbers.filter((_, i) => i !== idx);
    }
}