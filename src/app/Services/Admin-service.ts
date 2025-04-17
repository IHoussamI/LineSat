import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from './environnement';
import { IptvPlan } from '../Models/iptv-plan.model';
import { FreeTrialRequest } from '../Models/FreeTrialRequest.model';
import { BackendOrder, OrderRequest } from '../Models/OrderRequest.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPlans(): Observable<IptvPlan[]> {
    return this.http.get<IptvPlan[]>(`${this.apiUrl}${environment.endpoints.admin.plans}`)
      .pipe(catchError(this.handleError));
  }

  getTrials(): Observable<FreeTrialRequest[]> {
    return this.http.get<FreeTrialRequest[]>(`${this.apiUrl}${environment.endpoints.admin.trials}`)
      .pipe(catchError(this.handleError));
  }

  getOrderRequests(): Observable<OrderRequest[]> {
    return this.http.get<BackendOrder[]>(`${this.apiUrl}${environment.endpoints.admin.orders}`)
      .pipe(
        map(this.transformOrders),
        catchError(this.handleError)
      );
  }

  private transformOrders(orders: BackendOrder[]): OrderRequest[] {
    return orders.map(order => ({
      id: order.id,
      clientInfo: {
        firstName: order.clientInfo.firstName,
        lastName: order.clientInfo.lastName,
        email: order.clientInfo.email,
        phone: order.clientInfo.phone,
        city: order.clientInfo.city,
        orderCount: order.clientInfo.orderCount
      },
      selectedPlan: order.selectedPlan,
      orderDate: order.orderDate
    }));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => error.error?.message || 'Server error');
  }
}