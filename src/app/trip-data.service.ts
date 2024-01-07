import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import * as tripsData from '../assets/trips.json';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private httpClient: HttpClient){}

  getTrips(){
    return this.httpClient.get("assets/trips.json");
  }

  // addTrip(trip: any){
  //   saveText( JSON.stringify(obj), "filename.json" );
  //   return this.httpClient.post("assets/trips.json", trip);
  // }
}
