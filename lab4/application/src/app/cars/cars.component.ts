import { Component, OnInit } from '@angular/core';
import cars from './cars.json';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.scss']
})

export class CarsComponent implements OnInit {
    cars = cars;
    brands: string[];
    models: string[] = [];
    colors: string[] = [];
    selectedBrand = '';
    selectedModel = '';
    selectedColor = '';
    modelDescription = '';

    constructor() {
        this.brands = cars
            .map(car => car.brand)
            .filter((brand, i, brands) => brands.indexOf(brand) == i);
    }

    ngOnInit(): void {
        
    }

    resetModel(): void {
        this.selectedModel = '';
        this.models = [];
    }

    resetColor(): void {
        this.selectedColor = '';
        this.colors = [];
    }

    resetDescription(): void {
        this.modelDescription = '';
    }

    reset(): void {
        this.resetModel();
        this.resetColor();
        this.resetDescription();
    }

    onBrandChange(): void {
        this.reset();
        this.models = this.cars.filter(car => car.brand === this.selectedBrand).map(car => car.model);
    }

    onModelChange(): void {
        this.resetColor();
        this.colors = this.cars.filter(car => car.brand === this.selectedBrand && car.model === this.selectedModel)[0].colors;
    }
    
    onColorChange(): void {
        this.modelDescription = this.cars.filter(car => car.brand === this.selectedBrand && car.model === this.selectedModel)[0].description;
    }
}
