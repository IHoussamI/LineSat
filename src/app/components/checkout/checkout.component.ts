import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrderRequest } from '../../Models/OrderRequest.model';
import { OrderService } from '../../Services/order.service';
import { PlanService } from '../../Services/PlanService';
import { HttpClient } from '@angular/common/http';

interface PricingPlan {
  id: number;
  title: string;
  discountText: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  ctaText: string;
  planType: string;
  isPopular?: boolean;
}


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  selectedPlan: PricingPlan | null = null;
  checkoutForm!: FormGroup;
  isSubmitting = false;
  submissionStatus: 'success' | 'error' | 'none' = 'none';

  constructor(
    private planService: PlanService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedPlan = this.planService.getSelectedPlan();

    if (!this.selectedPlan) {
      console.log('No plan selected, redirecting to home.');
      this.router.navigate(['/home']);
      return;
    }

    this.checkoutForm = this.fb.group({
      firstName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['France', Validators.required],
      city: ['']
    });
  }

  onSubmit() {
    if (this.checkoutForm.invalid || !this.selectedPlan) {
      this.checkoutForm.markAllAsTouched();
      console.error('Form is invalid or no plan selected.');
      return;
    }

    this.isSubmitting = true;
    this.submissionStatus = 'none';

    const orderData: OrderRequest = {
      ...this.checkoutForm.value,
      selectedPlanId: this.selectedPlan.id
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (response: any) => {
        console.log('Order submitted successfully', response);
        this.submissionStatus = 'success';
      },
      error: (error: any) => {
        console.error('Error submitting order', error);
        this.submissionStatus = 'error';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }


}

