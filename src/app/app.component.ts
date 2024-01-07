import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TripMenuComponent } from './trip-menu/trip-menu.component';
import { TripComponent } from './trip/trip.component';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { HistoryComponent } from './history/history.component';
import { ReservedTripsService } from './reserved-trips.service';
import { TripDataService } from './trip-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TripMenuComponent, TripComponent, HomeComponent, BasketComponent, HistoryComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TripDataService, ReservedTripsService]
})
export class AppComponent {
  
  constructor(public reservedTripDataService: ReservedTripsService) { }
}
