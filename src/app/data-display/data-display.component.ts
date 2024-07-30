import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})
export class DataDisplayComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }
  
  fetchData() {
    this.httpClient.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
    });
  }
}
