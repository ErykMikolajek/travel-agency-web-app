import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {
    selectedCurrency: string = 'PLN';

    getCurrency() {
      return this.selectedCurrency;
    }

    changeCurrency(currency: string) {
      this.selectedCurrency = currency;
    }

    calculatePrice(price: number, previousCurrency: string, currentCurrency: string) {
      let eurToPlnRate: number = 4.3;
      let dollarToPlnRate: number = 3.8;
      let eurToDollarRate: number = 1.1;
      if (previousCurrency === 'PLN') {
        price = price / (currentCurrency === 'EUR' ? eurToPlnRate : dollarToPlnRate);
      } else if (previousCurrency === 'USD') {
        price = currentCurrency === 'PLN' ? price * dollarToPlnRate : price / eurToDollarRate;
      } else {
        price = currentCurrency === 'PLN' ? price * eurToPlnRate : price * eurToDollarRate;
      }
      return price;
    }
}
