import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from './../trip/trip';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private trips = new BehaviorSubject<{tripsNumber: number, data: Trip}[]>([]);
    trips$ = this.trips.asObservable();

    constructor() {}

    addNewTrip(trip: Trip): void {
        if (this.trips.getValue().find(t => t.data === trip)) {
            this.trips.getValue().find(t => t.data === trip)!.tripsNumber++;
            this.trips.next(this.trips.getValue());
        }
        else {
            this.trips.next(this.trips.getValue().concat({tripsNumber: 1, data: trip}));
        }
        console.log(this.trips);
    }

    removeTrip(trip: Trip): void {
        if (this.trips.getValue().find(t => t.data === trip)) {
            this.trips.getValue().find(t => t.data === trip)!.tripsNumber--;
            if (this.trips.getValue().find(t => t.data === trip)!.tripsNumber <= 0)
                this.trips.next(this.trips.getValue().filter(t => t.data !== trip));
        }
        
        console.log(this.trips);
    }
}