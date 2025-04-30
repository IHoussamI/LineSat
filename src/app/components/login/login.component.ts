import { Component } from '@angular/core';
import { AuthService } from '../../Services/Auth/Auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRequest } from '../../Models/auth-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: AuthRequest = {
    email: '',
    password: ''
  };

  error: string = '';
  redirectUrl: string = '/dashboard-admin'; // Default redirect
  validAccess: boolean = false;


  constructor(private authService: AuthService, private router: Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    // Check if we have a saved redirect URL
    const savedRedirect = localStorage.getItem('redirectAfterLogin');
    if (savedRedirect) {
      this.redirectUrl = savedRedirect;
    }
    
    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      // Clear the access flag
      sessionStorage.removeItem('attemptingProtectedAccess');
      // Redirect to destination
      this.router.navigateByUrl(this.redirectUrl);
    }
  }
 

  onLogin(): void {
    this.authService.login(this.authRequest).subscribe({
      next: () => {
        // Clear the access flag
        sessionStorage.removeItem('attemptingProtectedAccess');
        const redirectUrl = this.authService.getRedirectUrl();
        this.router.navigateByUrl(this.redirectUrl);
      },
      error: err => this.error = 'Login failed. P lease check your credentials.'
    });
  }



  ngOnDestroy(): void {
    // This prevents someone from going back to login page after navigating away
    sessionStorage.removeItem('attemptingProtectedAccess');
  }
}