import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/UAH'; // Використайте ваш API

  constructor(private http: HttpClient) { }

  getRates(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
