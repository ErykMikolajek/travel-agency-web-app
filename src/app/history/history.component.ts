import { Component } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';
import { ReservedTripsService } from '../services/reserved-trips.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  allTrips: any = [];

  constructor(public reservedTripsDataService: ReservedTripsService, public allTripsDataService: TripDataService) {}

  ngOnInit(){
    this.allTripsDataService.getTrips().subscribe((response) => this.allTrips = response);
  }
}
