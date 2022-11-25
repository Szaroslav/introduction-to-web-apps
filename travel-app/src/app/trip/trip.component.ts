import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface TripData {
    name: string;
    country: string;
    startDate: number;
    endDate: number;
    unitPrice: number;
    spotsNumber: number;
    description: string;
    previewImageURL: string; 
}

@Component({
    selector: 'app-trip',
    templateUrl: './trip.component.html',
    styleUrls: ['./trip.component.scss']
})

export class TripComponent implements OnInit { 
    @Input() data!: TripData;
    @Input() isMostExpensive!: boolean;
    @Input() isCheapest!: boolean;
    @Output() deleteDataEvent = new EventEmitter<TripData>();

    availableSpotsNumber!: number;

    ngOnInit(): void {
        this.availableSpotsNumber = this.data.spotsNumber;
    }

    book(): void {
        this.availableSpotsNumber--;
    }

    unbook(): void {
        this.availableSpotsNumber++;
    }

    delete(): void {
        this.deleteDataEvent.emit(this.data);
    }
}