import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TripsService } from '../trips/trips.service';
import { CartService } from './../cart/cart.service';
import { Trip, TripSpots } from './trip';

@Component({
    selector: 'app-trip',
    templateUrl: './trip.component.html',
    styleUrls: ['./trip.component.scss']
})

export class TripComponent implements OnInit { 
    data!: Trip;
    @Input() i!: number;
    @Input() isMostExpensive!: boolean;
    @Input() isCheapest!: boolean;

    averageReviewValue!: number;
    spotsNumbers!: TripSpots;

    constructor(private tripsService: TripsService, private cartService: CartService) {}

    ngOnInit(): void {
        this.tripsService.trips$.subscribe(trips => {
            if (this.i < 0 || this.i >= trips.length)
                return;
                
            this.data = trips[this.i];
            this.averageReviewValue = this.data.reviews.reduce((acc, review) => acc + review.value, 0) / this.data.reviews.length;
        });
        this.tripsService.spotsNumbers$[this.i].subscribe(spots => this.spotsNumbers = spots);
    }

    book(): void {
        this.tripsService.bookTrip(this.i);
    }

    unbook(): void {
        this.tripsService.unbookTrip(this.i);
    }

    delete(): void {
        this.tripsService.deleteTrip(this.i);
    }
}