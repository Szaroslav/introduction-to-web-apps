import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'swiper/scss';

import { TripsService } from './../trips/trips.service';
import { Trip } from '../trip/trip';

@Component({
    selector: 'app-trip-details',
    templateUrl: './trip-details.component.html',
    styleUrls: ['./trip-details.component.scss']
})

export class TripDetailsComponent implements OnInit {
    data!: Trip;

    constructor(private route: ActivatedRoute, private tripsService: TripsService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.data = this.tripsService.getTrip(parseInt(params['id']));
            console.log(this.data);
        });
    }
}