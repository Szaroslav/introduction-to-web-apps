import { Component, OnInit } from '@angular/core';
import cars from './cars.json';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.scss']
})

export class CarsComponent implements OnInit {
    cars = cars
    brands: string[]

    constructor() {
        this.brands = cars
            .map(car => car.brand)
            .filter((brand, i, brands) => brands.indexOf(brand) == i);

        console.log(this.brands);
    }

    ngOnInit(): void {}

}
