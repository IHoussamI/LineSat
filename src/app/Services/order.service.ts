import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRequest } from '../Models/OrderRequest.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(order: OrderRequest): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }
}
