import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';
import { TripMenuComponent } from './trip-menu/trip-menu.component';

import { TripDataService } from './services/trip-data.service';
import { ReservedTripsService } from './services/reserved-trips.service';
import { CurrencyDataService } from './services/currency-data.service';
import { SelectedCountriesPipe } from './pipes/selected-countries.pipe';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { ReservedTripsPipe } from './pipes/reserved-trips.pipe';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { BasketComponent } from './basket/basket.component';
import { AddTripComponent } from './add-trip/add-trip.component';

@NgModule({
  declarations: [
    //Components
    AppComponent,
    TripComponent,
    TripMenuComponent,
    HomeComponent,
    HistoryComponent,
    FilterComponent,
    BasketComponent,
    AddTripComponent,

    //Pipes
    SelectedCountriesPipe,
    ReservedTripsPipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [TripDataService, ReservedTripsService, CurrencyDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
