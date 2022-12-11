import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Review } from '../trip/trip';
import { ReviewService } from './../services/review.service';

@Component({
    selector: 'app-trip-rate',
    templateUrl: './trip-rate.component.html',
    styleUrls: ['./trip-rate.component.scss']
})

export class TripRateComponent implements OnInit {
    @ViewChild('tripIconsContainer') tripIconsContainer: any;
    i!: number;
    stars: number[] = [];
    highlightedElements: HTMLElement[] = [];
    rating = 0;

    form = new FormGroup({
        rating: new FormControl('', Validators.required),
        nickname: new FormControl('', Validators.required),
        startDate: new FormControl(''),
        description: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)])
    });

    constructor(private reviewService: ReviewService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.stars = Array(this.reviewService.MAXIMUM_REVIEW_VALUE).fill(0);
        this.route.params.subscribe(params => this.i = parseInt(params['id']));
    }

    highlight(index: number): void {
        Array.from(this.tripIconsContainer.nativeElement.children)
            .filter((_, i) => i >= this.rating && i <= index)
            .forEach(el => {
                this.highlightedElements.push(<HTMLElement> el);
                (<HTMLElement> el).classList.add('highlighted');
            });
    }

    unhighlight(): void {
        while (this.highlightedElements.length > this.rating)
            this.highlightedElements.pop()?.classList.remove('highlighted');
    }

    resetRating(): void {
        this.rating = 0;
        this.form.controls.rating.reset();
        this.unhighlight();
    }

    onMouseIn(e: Event): void {
        this.highlight(Array.from(this.tripIconsContainer.nativeElement.children).indexOf(e.target));
    }

    onMouseOut(): void {
        this.unhighlight();
    }

    onClick(e: Event): void {
        this.rating = Array.from(this.tripIconsContainer.nativeElement.children).indexOf(e.target) + 1;
        this.form.controls.rating.setValue(this.rating.toString());
        this.unhighlight();
    }

    onSubmit(): void {
        const newReview: Review = {
            value: parseInt(this.form.controls.rating.value!),
            description: this.form.controls.description.value!,
            date: this.form.controls.startDate.value! ? (<moment.Moment> (<unknown> this.form.controls.startDate.value!)).valueOf() : -1,
            user: {
                nickname: this.form.controls.nickname.value!
            }
        }
        this.reviewService.addReview(this.i, newReview);
        console.log(newReview);

        this.form.reset();
        this.resetRating();
    }

    getErrorMessage(control: FormControl): string {
        if (control.hasError('required'))
            return 'This field is required';
        if (control.hasError('minlength'))
            return 'This field has too few characters (50 minimum)'
        if (control.hasError('maxlength'))
            return 'This field has too many characters (500 maximum)'

        return '';
    }
}
