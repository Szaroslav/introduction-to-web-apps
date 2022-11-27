import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-trip-rate',
    templateUrl: './trip-rate.component.html',
    styleUrls: ['./trip-rate.component.scss']
})

export class TripRateComponent implements OnInit {
    @Input() RATING_STARS_NUMBER!: number;
    @ViewChild('tripIconsContainer') tripIconsContainer: any;
    stars: number[] = [];
    highlightedElements: HTMLElement[] = [];
    rating = 0;

    ngOnInit(): void {
        this.stars = Array(this.RATING_STARS_NUMBER).fill(0);
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

    reset(): void {
        this.rating = 0;
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
        this.unhighlight();
    }
}
