import { TripDataService } from '../services/trip-data.service';
import { ReservedTripsService } from '../services/reserved-trips.service';
import { CurrencyDataService } from '../services/currency-data.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-trip-menu',
  templateUrl: './trip-menu.component.html',
  styleUrl: './trip-menu.component.css',
})
export class TripMenuComponent {
  trips: any = [];
  tripMaxPrice: number = 0;
  tripMinPrice: number = 0;
  uniqueCountries: any = [];
  idsReserved: number[] = [];
  reservedTrips: Map<number, number> = new Map();

  selectedCountries: string[] = [];
  maxPriceSelected: number = 0;
  startDateSelected: number = -Infinity;
  endDateSelected: number = Infinity;
  ratingSelected: number[] = [1, 2, 3, 4, 5];

  constructor(private tripDataService: TripDataService, public reservedTripDataService: ReservedTripsService, public curencyDataService: CurrencyDataService) { }
  ngOnInit() {
    this.tripDataService.getTrips().subscribe(
    (response) => { 
      this.trips = response;
      this.tripMaxPrice = Math.max(...this.trips.map((item: any) => item.price))
      this.tripMinPrice = Math.min(...this.trips.map((item: any) => item.price))
      this.uniqueCountries = [...new Set(this.trips.map((item: any) => item.tripTarget))];
      this.selectedCountries = this.uniqueCountries;
      this.maxPriceSelected = this.getTripsMaxPrice();
    },
    (error) => { console.log(error); });
  }

  selectCurrency(currency: string) {
    this.curencyDataService.changeCurrency(currency);
    this.maxPriceSelected = this.getTripsMaxPrice();
  }

  getTripsMaxPrice() {
    if (this.curencyDataService.getCurrency() === 'PLN') {
      return Math.max(...this.trips.map((item: any) => item.pricePLN));
    } else if (this.curencyDataService.getCurrency() === 'EUR') {
      return Math.max(...this.trips.map((item: any) => item.priceEUR));
    } else {
      return Math.max(...this.trips.map((item: any) => item.priceUSD));
    }
  }

  getTripsMinPrice() {
    if (this.curencyDataService.getCurrency() === 'PLN') {
      return Math.min(...this.trips.map((item: any) => item.pricePLN));
    } else if (this.curencyDataService.getCurrency() === 'EUR') {
      return Math.min(...this.trips.map((item: any) => item.priceEUR));
    } else {
      return Math.min(...this.trips.map((item: any) => item.priceUSD));
    }
  }

  deleteTrip(deleted: number) {
    this.trips = this.trips.filter((item: any) => item.id !== deleted);
  }

  applyFilter(filter: any) {
    this.selectedCountries = filter.countries;
    this.maxPriceSelected = filter.maxPrice;
    if (filter.startDate === '') {
      this.startDateSelected = -Infinity;
    } else {
      this.startDateSelected = Date.parse(filter.startDate);
    }
    if (filter.endDate === '') {
      this.endDateSelected = Infinity;
    } else {
      this.endDateSelected = Date.parse(filter.endDate);
    }
    this.ratingSelected = filter.rating;
  }

}