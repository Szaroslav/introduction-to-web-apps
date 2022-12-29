import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trips/trip/trip';

@Pipe({
    name: 'tripsFilter'
})

export class TripsFilterPipe implements PipeTransform {
    transform(value: Trip[], filters: any): Trip[] {
        return value.filter(v => {
            if (filters.countries && filters.countries.length && !filters.countries.includes(v.country))
                return false;
            // if (filters.ratings && filters.ratings.length)
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