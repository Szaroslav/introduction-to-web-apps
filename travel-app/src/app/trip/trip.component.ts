import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from './../cart/cart.service';
import { Trip } from './trip';

@Component({
    selector: 'app-trip',
    templateUrl: './trip.component.html',
    styleUrls: ['./trip.component.scss']
})

export class TripComponent implements OnInit { 
    @Input() RATING_STARS_NUMBER!: number;
    @Input() data!: Trip;
    @Input() isMostExpensive!: boolean;
    @Input() isCheapest!: boolean;
    @Output() deleteDataEvent = new EventEmitter<Trip>();

    reservedSpotsNumber: number = 0;
    availableSpotsNumber!: number;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.availableSpotsNumber = this.data.spotsNumber - this.data.purchasedSpotsNumber;
    }

    book(): void {
        this.reservedSpotsNumber = Math.min(this.reservedSpotsNumber + 1, this.availableSpotsNumber);
        this.cartService.addNewTrip(this.data);
    }

    unbook(): void {
        this.reservedSpotsNumber = Math.max(this.reservedSpotsNumber - 1, 0);
        this.cartService.removeTrip(this.data);
    }

    delete(): void {
        this.deleteDataEvent.emit(this.data);
    }
}