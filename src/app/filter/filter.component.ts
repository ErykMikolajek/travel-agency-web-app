import { Component, Input, Output, OnChanges, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { CurrencyDataService } from '../services/currency-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnChanges{

  constructor(public currencyDataService: CurrencyDataService) {}

  @Input() tripMaxPrice: number = 0;
  @Input() tripMinPrice: number = 0;
  @Input() uniqueCountries: any = [];

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
    this.countriesSelected = this.uniqueCountries;
    this.maxPriceSelected = this.tripMaxPrice;
  }
}
