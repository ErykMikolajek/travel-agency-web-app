import { Component, Input, Output, OnChanges, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnChanges {
  @Input() tripMaxPrice: number = 0;
  @Input() tripMinPrice: number = 0;
  @Input() uniqueCountries: any = [];
  @Input() selectedCurrency = 'PLN';
  firstMinPrice: number = 0;
  firstMaxPrice: number = 0;
  eurToPlnRate: number = 4.3;
  dollarToPlnRate: number = 3.8;
  eurToDollarRate: number = 1.1;

  countriesSelected: string[] = [];
  maxPriceSelected: number = this.tripMaxPrice;
  startDateSelected: string = '';
  endDateSelected: string = '';
  ratingSelected: number[] = [1, 2, 3, 4, 5];

  @Output() filter = new EventEmitter<any>();

  emitFilter() {
    this.filter.emit({
      countries: this.countriesSelected,
      maxPrice: this.maxPriceSelected,
      startDate: this.startDateSelected,
      endDate: this.endDateSelected,
      rating: this.ratingSelected
    });
  }

  modifyCountriesSelected(country: string) {
    if (this.countriesSelected.includes(country)) {
      this.countriesSelected = this.countriesSelected.filter((item: string) => item !== country);
    } else {
      this.countriesSelected.push(country);
    }
    this.emitFilter();
  }
  modifyRatingSelected(rating: number) {
    if (this.ratingSelected.includes(rating)) {
      this.ratingSelected = this.ratingSelected.filter((item: number) => item !== rating);
    } else {
      this.ratingSelected.push(rating);
    }
    this.emitFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["tripMaxPrice"]) {
      this.tripMaxPrice = changes["tripMaxPrice"].currentValue;
      this.tripMinPrice = changes["tripMinPrice"].currentValue;
      this.firstMaxPrice = this.tripMaxPrice;
      this.firstMinPrice = this.tripMinPrice;
      this.maxPriceSelected = this.tripMaxPrice;
    }
    if (changes["uniqueCountries"]) {
      this.countriesSelected = changes["uniqueCountries"].currentValue;
    }
    if (changes["selectedCurrency"] && changes["selectedCurrency"].firstChange === false) {
      if (changes["selectedCurrency"].previousValue === 'PLN') {
        this.tripMinPrice = this.tripMinPrice / (changes["selectedCurrency"].currentValue === 'EUR' ? this.eurToPlnRate : this.dollarToPlnRate);
        this.tripMaxPrice = this.tripMaxPrice / (changes["selectedCurrency"].currentValue === 'EUR' ? this.eurToPlnRate : this.dollarToPlnRate);
      } else if (changes["selectedCurrency"].previousValue === 'USD') {
        this.tripMinPrice = changes["selectedCurrency"].currentValue === 'PLN' ? this.firstMinPrice : this.tripMinPrice / this.eurToDollarRate;
        this.tripMaxPrice = changes["selectedCurrency"].currentValue === 'PLN' ? this.firstMaxPrice : this.tripMaxPrice / this.eurToDollarRate;
      } else {
        this.tripMinPrice = changes["selectedCurrency"].currentValue === 'PLN' ? this.firstMinPrice : this.tripMinPrice * this.eurToDollarRate;
        this.tripMaxPrice = changes["selectedCurrency"].currentValue === 'PLN' ? this.firstMaxPrice : this.tripMaxPrice * this.eurToDollarRate;
      }
    }
    this.maxPriceSelected = this.tripMaxPrice;
  }
}
