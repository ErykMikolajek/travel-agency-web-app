import { Injectable } from '@angular/core';
import { TripDataService } from './trip-data.service';
import { CurrencyDataService } from './currency-data.service';

@Injectable({
  providedIn: 'root'
})
export class ReservedTripsService {
  reservedTrips: Map<number, number> = new Map();
  boughtTrips: Map<number, number> = new Map();
  allTrips: any = [];

  constructor(private tripDataService: TripDataService, private curencyDataService: CurrencyDataService) { 
    this.tripDataService.getTrips().subscribe(
      (response) => { 
        this.allTrips = response;
      },
      (error) => { console.log(error); });
  }

  addTrip(tripId: number) {
    if (this.reservedTrips.has(tripId)) {
      let count = this.reservedTrips.get(tripId);
      if (count !== undefined) {
        this.reservedTrips.set(tripId, count + 1);
      }
    }
    else {
      this.reservedTrips.set(tripId, 1);
    }
  }

  removeTrip(tripId: number) {
    if (this.reservedTrips.has(tripId)) {
      let count = this.reservedTrips.get(tripId);
      if (count !== undefined) {
        this.reservedTrips.set(tripId, count - 1);
        console.log("Wycieczka:", tripId, count - 1);
      }
    }
  }

  getReservedTrips() {
    return this.reservedTrips;
  }

  howManyReserved() {
    let sum = 0;
    this.reservedTrips.forEach(value => {
      sum += value;
    });
    return sum;
  }

  reservedTripsSumValue() {
    let sum = 0;
    if (this.curencyDataService.getCurrency() === 'PLN') {
      for (let [key, value] of this.reservedTrips) {
        sum += this.allTrips.filter((item: any) => item.id === key)[0].pricePLN * value;
      }
    } else if (this.curencyDataService.getCurrency() === 'EUR') {
      for (let [key, value] of this.reservedTrips) {
        sum += this.allTrips.filter((item: any) => item.id === key)[0].priceEUR * value;
      }
    } else {
      for (let [key, value] of this.reservedTrips) {
        sum += this.allTrips.filter((item: any) => item.id === key)[0].priceUSD * value;
      }
    }
    return sum;
  }

  selectedtTripsSumValue(tripsId: number[]) {
    let sum = 0;
    if (this.curencyDataService.getCurrency() === 'PLN') {
      tripsId.forEach((tripId: number) => {
        sum += this.allTrips.filter((item: any) => item.id === tripId)[0].pricePLN * (this.reservedTrips.get(tripId) || 1);
      });
    } else if (this.curencyDataService.getCurrency() === 'EUR') {
      tripsId.forEach((tripId: number) => {
        sum += this.allTrips.filter((item: any) => item.id === tripId)[0].priceEUR * (this.reservedTrips.get(tripId) || 1);
      });
    } else {
      tripsId.forEach((tripId: number) => {
        sum += this.allTrips.filter((item: any) => item.id === tripId)[0].priceUSD * (this.reservedTrips.get(tripId) || 1);
      });
    }
    return sum;
  }

  reservedTripSumValue(tripId: number) {
    let sum = 0;
    if (this.curencyDataService.getCurrency() === 'PLN') {
      sum = this.allTrips.filter((item: any) => item.id === tripId)[0].pricePLN 
    } else if (this.curencyDataService.getCurrency() === 'EUR') {
      sum = this.allTrips.filter((item: any) => item.id === tripId)[0].priceEUR;
    } else {
      sum = this.allTrips.filter((item: any) => item.id === tripId)[0].priceUSD;
    }
    return sum * (this.reservedTrips.get(tripId) || 1);
  }

  buyTrips(tripsId: number[]) {
    tripsId.forEach((tripId: number) => {
      this.boughtTrips.set(tripId, this.reservedTrips.get(tripId) || 1);
      this.reservedTrips.delete(tripId);
    });
  }

  getBoughtTrips() {
    return this.boughtTrips;
  }
}
