import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  usdRate: any;
  eurRate: any;

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRateService.getRates().subscribe((data: any) => {
      this.usdRate = data.rates.USD;
      this.eurRate = data.rates.EUR;
    });
  }
}
