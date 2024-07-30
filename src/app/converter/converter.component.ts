import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent implements OnInit {
  rates: any;
  currencies: string[] = ['UAH', 'USD', 'EUR'];
  fromCurrency: string = 'UAH';
  toCurrency: string = 'USD';
  fromAmount: number = 1;
  toAmount: number = 1;

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRateService.getRates().subscribe((data: any) => {
      this.rates = data.rates;
      this.convertFromAmount();
    });
  }

  convertFromAmount(): void {
    if (this.fromCurrency === this.toCurrency) {
      this.toAmount = this.fromAmount;
    } else {
      const rate = this.rates[this.toCurrency] / this.rates[this.fromCurrency];
      this.toAmount = this.fromAmount * rate;
    }
  }

  convertToAmount(): void {
    if (this.fromCurrency === this.toCurrency) {
      this.fromAmount = this.toAmount;
    } else {
      const rate = this.rates[this.fromCurrency] / this.rates[this.toCurrency];
      this.fromAmount = this.toAmount * rate;
    }
  }

  onFromAmountChange(value: number): void {
    this.fromAmount = value;
    this.convertFromAmount();
  }

  onToAmountChange(value: number): void {
    this.toAmount = value;
    this.convertToAmount();
  }

  onFromCurrencyChange(currency: string): void {
    this.fromCurrency = currency;
    this.convertFromAmount();
  }

  onToCurrencyChange(currency: string): void {
    this.toCurrency = currency;
    this.convertFromAmount();
  }
}
