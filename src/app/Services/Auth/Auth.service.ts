import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRequest } from '../../Models/auth-request.model';
import { AuthResponse } from '../../Models/auth-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private redirectUrl: string = '/dashboard'; // Default redirect

  constructor(private http: HttpClient , private router : Router) {}

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    sessionStorage.removeItem('token');
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, authRequest).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
        // Check if there's a saved redirect URL
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          // Clear the saved URL
          localStorage.removeItem('redirectAfterLogin');
          // Router navigation will be handled by the component
        }
      })
    );
  }
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    const url = this.redirectUrl;
    this.redirectUrl = '/dashboard'; // Reset to default
    return url;
  }


  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('redirectUrl');
    sessionStorage.removeItem('attemptingProtectedAccess');

    // Redirect to login page after logout
    this.router.navigate(['/home']);
    }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
