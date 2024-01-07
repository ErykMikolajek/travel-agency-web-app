import { Injectable } from '@angular/core';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class ReservedTripsService {

  reservedTrips: Map<number, number> = new Map();
  allTrips: any = [];

  constructor(private tripDataService: TripDataService) { 
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
    for (let [key, value] of this.reservedTrips) {
      sum += this.allTrips.filter((item: any) => item.id === key)[0].price * value;
    }
    return sum;
  }
}
