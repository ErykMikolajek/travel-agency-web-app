import { Component } from '@angular/core';
import { ReservedTripsService } from '../services/reserved-trips.service';
import { TripDataService } from '../services/trip-data.service';
import { CurrencyDataService } from '../services/currency-data.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  allTrips: any = [];
  checkedTripsId: number[] = [];

  constructor(private allTripsDataService: TripDataService, public reservedTripsDataService: ReservedTripsService, public curencyDataService: CurrencyDataService) {}  

  ngOnInit() {
    this.allTripsDataService.getTrips().subscribe((data: any) => {
      this.allTrips = data;
    });
    this.checkedTripsId = Array.from(this.reservedTripsDataService.getReservedTrips().keys());
  }

  modifyReservationsSelected(id: number) {
    if (this.checkedTripsId.includes(id)) {
      this.checkedTripsId = this.checkedTripsId.filter((item: number) => item !== id);
    } else {
      this.checkedTripsId.push(id);
    }
  }

  buyTrips() {
    this.reservedTripsDataService.buyTrips(this.checkedTripsId);
    this.checkedTripsId = [];
  }
}
