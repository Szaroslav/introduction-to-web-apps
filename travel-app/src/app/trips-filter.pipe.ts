import { Pipe, PipeTransform } from '@angular/core';
import { TripData } from './trip/trip.component';

@Pipe({
    name: 'tripsFilter'
})

export class TripsFilterPipe implements PipeTransform {
    transform(value: TripData[], filters: any): TripData[] {
        return value.filter(v => {
            if (filters.countries && !filters.countries.includes(v.country))
                return false;
            // if (filters.ratings)
            //     return filters.ratings.includes(v.country);
            if (filters.price.lowest && v.unitPrice < filters.price.lowest)
                return false;
            if (filters.price.highest && v.unitPrice > filters.price.highest)
                return false;
            if (filters.date.start && v.startDate < filters.date.start.valueOf())
                return false;
            if (filters.date.end && v.endDate > filters.date.end.valueOf())
                return false;

            return true;
        });
    }
}