import { CartService } from './cart.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from '../trips/trip/trip';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    trips: {tripsNumber: number, data: Trip}[] = [];

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.trips$.subscribe(trips => this.trips = trips);
    }
}
