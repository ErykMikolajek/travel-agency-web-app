import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,   
    name: 'selectedCountries',
    pure: false
})
export class SelectedCountriesPipe implements PipeTransform {
  transform(allTrips: any, selectedCountries: any, tripMaxPrice: any, startDate: any, endDate: any, rating: any, selectedCurrency: String) {
    if (selectedCurrency === 'PLN') {
      return allTrips.filter((trip: any) => selectedCountries.includes(trip.tripTarget) && trip.pricePLN <= tripMaxPrice && Date.parse(trip.startDate) >= startDate && Date.parse(trip.endDate) <= endDate && rating.includes(trip.rating));
    } else if (selectedCurrency === 'EUR') {
      return allTrips.filter((trip: any) => selectedCountries.includes(trip.tripTarget) && trip.priceEUR <= tripMaxPrice && Date.parse(trip.startDate) >= startDate && Date.parse(trip.endDate) <= endDate && rating.includes(trip.rating));
    } else {
      return allTrips.filter((trip: any) => selectedCountries.includes(trip.tripTarget) && trip.priceUSD <= tripMaxPrice && Date.parse(trip.startDate) >= startDate && Date.parse(trip.endDate) <= endDate && rating.includes(trip.rating));
    }
  }
}