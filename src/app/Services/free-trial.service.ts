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
  // Define structure based on what 'FreeTrialRequest' model returns from backend
  // Example properties (adjust based on your actual backend model):
  id?: number; 
  email?: string;
  firstName?: string;
  country?:string;
  whatsappNumber?: number;
  verificationToken?: string;
  isVerified?: boolean;
  createdAt?: string; // Assuming ISO date string format
  message?: string; // Include if backend sometimes sends a message property
}

@Injectable({
  providedIn: 'root'
})
export class FreeTrialService {
  // Use environment variable or configuration service in a real app
  private apiUrl = 'http://localhost:8080/free-trial'; 

  constructor(private http: HttpClient) { }

  requestTrial(data: FreeTrialRequestDTO): Observable<FreeTrialResponse> {
    return this.http.post<FreeTrialResponse>(`${this.apiUrl}/request`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('An error occurred:');
        console.log(error.error); // Log the raw error object
        
        // Don't transform the error - pass it through as is
        return throwError(() => error);
      })
    );
  }

  // // Basic error handler (can be expanded)
  // private handleError(error: HttpErrorResponse) {
  //   console.error('An error occurred:', error.error);
  //   // Return an observable with a user-facing error message
  //   return throwError(() => new Error(error.error?.message || 'Something bad happened; please try again later.'));
  // }
} 