import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnChanges {

  @Input() trip: any;
  @Input() maxPrice: number = 0;
  @Input() minPrice: number = 0;
  @Input() selectedCurrency: string = 'PLN';
  firstPrice: number = 0;
  eurToPlnRate: number = 4.3;
  dollarToPlnRate: number = 3.8;
  eurToDollarRate: number = 1.1;
  reserved: number = 0;
  stars = [1, 2, 3, 4, 5];
  @Output() addReservation = new EventEmitter<number>();
  @Output() deleteReservation = new EventEmitter<number>();
  @Output() deleteCurrentTrip = new EventEmitter<number>();

  add() {
    if (this.trip.maxCapacity > 0){
    this.trip.maxCapacity--;
    this.reserved++;
    this.addReservation.emit(this.trip.id);
    }
  }
  remove() {
    if (this.reserved > 0){
      this.trip.maxCapacity++;
      this.reserved--;
      this.deleteReservation.emit(this.trip.id);
    }
  }
  deleteTrip(){
    this.deleteCurrentTrip.emit(this.trip.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedCurrency"].firstChange === true) this.firstPrice = this.trip.price;
    if (changes["selectedCurrency"].firstChange === false) {
      if (changes["selectedCurrency"].previousValue === 'PLN') {
        this.trip.price = this.trip.price / (changes["selectedCurrency"].currentValue === 'EUR' ? this.eurToPlnRate : this.dollarToPlnRate);
      } else if (changes["selectedCurrency"].previousValue === 'USD') {
        this.trip.price = changes["selectedCurrency"].currentValue === 'PLN' ? this.firstPrice : this.trip.price / this.eurToDollarRate;
      } else {
        this.trip.price = changes["selectedCurrency"].currentValue === 'PLN' ? this.firstPrice : this.trip.price * this.eurToDollarRate;
      }
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
