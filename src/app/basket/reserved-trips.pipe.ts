import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,   
    name: 'reservedTrips',
    pure: false
})
export class ReservedTripsPipe implements PipeTransform {
  transform(allTrips: any, reserved: any): any {
    let reservedKeysArray = Array.from(reserved.keys());
    return allTrips.filter((trip: any) => reservedKeysArray.includes(trip.id) && reserved.get(trip.id) > 0);
  }
}