import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Trip } from '../trip/trip';
import trips from './trips.json';

@Injectable({
    providedIn: 'root'
})

export class TripsService {
    private trips = new BehaviorSubject<Trip[]>(trips);
    trips$ = this.trips.asObservable();

    constructor() {}

    getTrip(id: number): Trip {
        return this.trips.getValue().find(t => t.id === id) ? this.trips.getValue().find(t => t.id === id)! : new Trip();
    }
}