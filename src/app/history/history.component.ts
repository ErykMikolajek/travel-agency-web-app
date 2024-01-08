import { TripDataService } from './../trip-data.service';
import { ReservedTripsService } from './../reserved-trips.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservedTripsPipe } from '../basket/reserved-trips.pipe';
import { TripComponent } from '../trip/trip.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReservedTripsPipe, CommonModule, TripComponent],
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
