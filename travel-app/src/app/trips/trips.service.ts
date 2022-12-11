import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Trip, TripSpots, Review } from '../trip/trip';
import { CartService } from './../cart/cart.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import trips from './trips.json';

@Injectable({
    providedIn: 'root'
})

export class TripsService {
    private trips!: Trip[];
    trips$!: Observable<Trip[]>;
    // trips$ = this.trips.asObservable();
    private spotsNumbers = Array(trips.length).fill(0).map((_, i) => new BehaviorSubject<TripSpots>(new TripSpots(0, trips[i].spotsNumber - trips[i].purchasedSpotsNumber)));
    spotsNumbers$ = this.spotsNumbers.map(s => s.asObservable());

    constructor(private firestore: AngularFirestore,private cartService: CartService) {
        this.trips$ = this.firestore.collection<Trip>('trips').valueChanges();
        this.trips$.subscribe(trips => this.trips = trips);
    }

    getTrip(idx: number): Trip {
        return idx >= 0 && idx < this.trips.length ? this.trips[idx] : new Trip();
    }

    getTripsLength() {
        return this.trips.length;
    }

    setTrip(idx: number, newTrip: Trip): void {
        if (idx < 0 || idx >= this.trips.length)
            return;

        this.trips[idx] = newTrip;
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

    addTrip(trip: Trip): void {
        this.trips.next(this.trips.getValue().concat(trip));
        this.spotsNumbers.push(new BehaviorSubject<TripSpots>(new TripSpots(0, trip.spotsNumber - trip.purchasedSpotsNumber)));
        this.spotsNumbers$.push(this.spotsNumbers[this.spotsNumbers.length - 1].asObservable());
    }

    deleteTrip(idx: number): void {
        if (idx < 0 || idx >= this.trips.getValue().length)
            return;

        this.trips.next(this.trips.getValue().filter((_, i) => i !== idx));
        this.spotsNumbers = this.spotsNumbers.filter((_, i) => i !== idx);
    }
}