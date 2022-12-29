import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Trip, TripSpots, Review } from '../trip/trip';
import { CartService } from '../../cart/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class TripsService {
    private TRIPS_API_URL = 'api/trips'

    private trips = new BehaviorSubject<Trip[]>([]);
    trips$ = this.trips.asObservable();
    private spotsNumbers: BehaviorSubject<TripSpots>[] = [];
    spotsNumbers$: Observable<TripSpots>[] = [];

    constructor(private http: HttpClient, private cartService: CartService) {}

    getTrips(): void {
        this.http.get<Trip[]>(this.TRIPS_API_URL).subscribe(data => {
            this.trips.next(data);
            this.spotsNumbers = Array(this.getTripsLength())
                .fill(0)
                .map((_, i) => new BehaviorSubject<TripSpots>(new TripSpots(0, this.trips.getValue()[i].spotsNumber - this.trips.getValue()[i].purchasedSpotsNumber)));
            this.spotsNumbers$ = this.spotsNumbers.map(s => s.asObservable());
        });
    }

    getTrip(idx: number): Trip {
        return idx >= 0 && idx < this.getTripsLength() ? this.trips.getValue()[idx] : new Trip();
    }

    getTripsLength() {
        return this.trips.getValue().length;
    }

    updateTrip(idx: number, newTrip: Trip): void {
        if (idx < 0 || idx >= this.getTripsLength())
            return;

        this.http.post(`${this.TRIPS_API_URL}/${this.trips.getValue()[idx].id}`, newTrip)
            .subscribe(() => this.getTrips());
    }

    bookTrip(idx: number): void {
        if (idx < 0 || idx >= this.getTripsLength())
            return;

        const sn = this.spotsNumbers[idx].getValue();
        this.spotsNumbers[idx].next(new TripSpots(Math.min(sn.reserved + 1, sn.available), sn.available));
        this.cartService.addNewTrip(this.trips.getValue()[idx]);
    }

    unbookTrip(idx: number): void {
        if (idx < 0 || idx >= this.getTripsLength())
            return;
        
        const sn = this.spotsNumbers[idx].getValue();
        this.spotsNumbers[idx].next(new TripSpots(Math.max(sn.reserved - 1, 0), sn.available));
        this.cartService.removeTrip(this.trips.getValue()[idx]);
    }

    addTrip(trip: Trip): void {
        this.http.put(this.TRIPS_API_URL, trip)
            .subscribe(() => this.getTrips());
    }

    deleteTrip(idx: number): void {
        if (idx < 0 || idx >= this.getTripsLength())
            return;
        
        this.http.delete(`${this.TRIPS_API_URL}/${this.trips.getValue()[idx].id}`)
            .subscribe(() => this.getTrips());
    }
}