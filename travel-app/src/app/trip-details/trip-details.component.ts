import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import SwiperCore, { Pagination } from "swiper";

import { TripsService } from './../trips/trips.service';
import { Trip, TripSpots } from '../trip/trip';

SwiperCore.use([Pagination]);

@Component({
    selector: 'app-trip-details',
    templateUrl: './trip-details.component.html',
    styleUrls: ['./trip-details.component.scss']
})

export class TripDetailsComponent implements OnInit {
    @Input() i!: number;
    // @Input() reservedSpotsNumber!: number;
    // @Output() reservedSpotsNumberChange = new EventEmitter<number>();
    // @Input() availableSpotsNumber!: number;
    // @Output() availableSpotsNumberChange = new EventEmitter<number>();

    data!: Trip;
    spotsNumbers!: TripSpots;

    constructor(private route: ActivatedRoute, private tripsService: TripsService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.i = parseInt(params['id']);
            this.data = this.tripsService.getTrip(this.i);
        });
        this.tripsService.spotsNumbers$[this.i].subscribe(spots => this.spotsNumbers = spots);
    }

    book(): void {
        this.tripsService.bookTrip(this.i);
    }

    unbook(): void {
        this.tripsService.unbookTrip(this.i);
    }
}