import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {
  currencies = ['UAH', 'USD', 'EUR'];
  rates: any = {};
  amount1: number = 1;
  amount2: number = 1;
  currency1: string = 'USD';
  currency2: string = 'UAH';
  usdToUahRate!: number;
  eurToUahRate!: number;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.getRates(this.currency1);
  }

  getRates(baseCurrency: string): void {
    this.currencyService.getRates(baseCurrency).subscribe(data => {
      this.rates = data.rates;
      this.usdToUahRate = this.rates['UAH'] / this.rates['USD'];
      this.eurToUahRate = this.rates['UAH'] / this.rates['EUR'];
      this.convertFromFirstToSecond();
    });
  }

  convertFromFirstToSecond(): void {
    if (this.rates) {
      this.amount2 = this.amount1 * (this.rates[this.currency2] / this.rates[this.currency1]);
    }
  }

  convertFromSecondToFirst(): void {
    if (this.rates) {
      this.amount1 = this.amount2 * (this.rates[this.currency1] / this.rates[this.currency2]);
    }
  }

  onAmount1Change(): void {
    this.convertFromFirstToSecond();
  }

  onAmount2Change(): void {
    this.convertFromSecondToFirst();
  }

  onCurrency1Change(): void {
    this.getRates(this.currency1);
  }

  onCurrency2Change(): void {
    this.convertFromFirstToSecond();
  }
}