import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,   
    name: 'selectedCountries',
    pure: false
})
export class SelectedCountriesPipe implements PipeTransform {
  transform(allTrips: any, selectedCountries: any, tripMaxPrice: any, startDate: any, endDate: any, rating: any) {
        return allTrips.filter((trip: any) => selectedCountries.includes(trip.tripTarget) && trip.price <= tripMaxPrice && Date.parse(trip.startDate) >= startDate && Date.parse(trip.endDate) <= endDate && rating.includes(trip.rating));
  }
}