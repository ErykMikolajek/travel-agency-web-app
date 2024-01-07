import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservedTripsService } from '../reserved-trips.service';
import { TripDataService } from '../trip-data.service';
import { TripComponent } from '../trip/trip.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, TripComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  reservedTrips: any[] = [];
  allTrips: any = [];

  constructor(private allTripsDataService: TripDataService, public reservedTripsDataService: ReservedTripsService) {}  

  public async initializeData() {
    this.allTrips = await this.allTripsDataService.getTrips().toPromise();
  }
  async ngOnInit() {
    await this.initializeData();
    let reserved = Array.from(this.reservedTripsDataService.getReservedTrips().keys());
    this.reservedTrips = this.allTrips.filter((trip: any) => reserved.includes(trip.id));
  }

  
}
