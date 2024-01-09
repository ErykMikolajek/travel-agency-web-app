import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CurrencyDataService } from '../services/currency-data.service';
import { ReservedTripsService } from '../services/reserved-trips.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnChanges {
  constructor(public currencyDataService: CurrencyDataService, public reservedTripsDataService: ReservedTripsService) {}

  @Input() trip: any;
  @Input() maxPrice: number = 0;
  @Input() minPrice: number = 0;
  @Input() isInBasket: boolean = false;
  @Input() isInBought: boolean = false;

  reserved: number = 0;
  stars = [1, 2, 3, 4, 5];
  @Output() deleteCurrentTrip = new EventEmitter<number>();

  add() {
    if (this.trip.maxCapacity > 0){
    this.trip.maxCapacity--;
    this.reserved++;
    this.reservedTripsDataService.addTrip(this.trip.id);
    }
  }
  remove() {
    if (this.reserved > 0){
      this.trip.maxCapacity++;
      this.reserved--;
      this.reservedTripsDataService.removeTrip(this.trip.id);
    }
  }
  deleteTrip(){
    this.deleteCurrentTrip.emit(this.trip.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['trip'].firstChange === true) {
      this.reserved = this.reservedTripsDataService.getReservedTrips().get(this.trip.id) || 0;
    }
  }
  
  starsRating: number = 0;
  starsConfirmed: boolean = false;
  colorStars(stars: number) {
    if (!this.starsConfirmed) {
      this.starsRating = stars;
    }
  }
  confirmStars(stars: number) {
    if (this.starsConfirmed) {
      this.starsConfirmed = false;
    }
    else {
      this.starsConfirmed = true;
      this.starsRating = stars;
    }
  }
}
