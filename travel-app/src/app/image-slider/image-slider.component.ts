import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss']
})

export class ImageSliderComponent {
    @Input() imageURLs!: string[];
    currentIndex = 0;

    next(): void {
        this.currentIndex = this.currentIndex + 1 < this.imageURLs.length ? this.currentIndex + 1 : 0;
    }

    previous(): void {
        this.currentIndex = this.currentIndex - 1 >= 0 ? this.currentIndex - 1 : this.imageURLs.length - 1;
    }
}