import { Injectable } from '@angular/core';
import { Review } from '../trips/trip/trip';
import { TripsService } from '../trips/trips/trips.service';

@Injectable({
    providedIn: 'root'
})

export class ReviewService {
    MAXIMUM_REVIEW_VALUE = 5;

    constructor(private tripsService: TripsService) {}

    addReview(idx: number, review: Review): void {
        if (idx < 0 || idx >= this.tripsService.getTripsLength())
            return;

        const t = this.tripsService.getTrip(idx);
        t.reviews.push(review);
        this.tripsService.updateTrip(idx, t);
    }
}