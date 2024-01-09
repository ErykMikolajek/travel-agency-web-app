import { Component } from '@angular/core';
import { CurrencyDataService } from './services/currency-data.service';
import { ReservedTripsService } from './services/reserved-trips.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public reservedTripDataService: ReservedTripsService, public currencyDataService: CurrencyDataService) {}
}
