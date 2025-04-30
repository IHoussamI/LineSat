import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface for the data sent TO the backend
export interface FreeTrialRequestDTO {
  email: string;
  firstName: string;
  country: string;
  whatsappNumber: number | null;
}

// Interface for the data received FROM the backend
export interface FreeTrialResponse {
  id?: number; 
  email?: string;
  firstName?: string;
  country?:string;
  whatsappNumber?: number;
  verificationToken?: string;
  isVerified?: boolean;
  createdAt?: string; 
  message?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class FreeTrialService {
  private apiUrl = 'https://api.line-sat.com/free-trial'; 

  constructor(private http: HttpClient) { }

  requestTrial(data: FreeTrialRequestDTO): Observable<FreeTrialResponse> {
    return this.http.post<FreeTrialResponse>(`${this.apiUrl}/request`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('An error occurred:');
        console.log(error.error); 
        
        // Don't transform the error - pass it through as is
        return throwError(() => error);
      })
    );
  }

 
} 