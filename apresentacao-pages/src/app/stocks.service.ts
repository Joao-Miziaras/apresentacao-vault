import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  // Em vez de colocar a URL fixa, usamos a do environment
  private apiUrl = environment.apiUrl + '/stocks';

  constructor(private http: HttpClient) {}

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  generateStockData(count: number = 10): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate`, { count });
  }
}
