import { Component, OnInit } from '@angular/core';
import { Trip } from '../trips/trip/trip';
import { CartService } from '../cart/cart.service';

@Component({
    selector: 'app-cart-compact',
    templateUrl: './cart-compact.component.html',
    styleUrls: ['./cart-compact.component.scss']
})

export class CartCompactComponent implements OnInit {
    trips: {tripsNumber: number, data: Trip}[] = [];
    quantity = 0;
    totalPrice = 0;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.trips$.subscribe(trips => {
            this.quantity = trips.reduce((acc, trip) => acc + trip.tripsNumber, 0);
            this.totalPrice = trips.reduce((acc, trip) => acc + trip.tripsNumber * trip.data.unitPrice, 0);
        });
    }
}