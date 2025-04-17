import { Component, OnInit } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IptvPlan } from '../../Models/iptv-plan.model';
import { FreeTrialRequest } from '../../Models/FreeTrialRequest.model';
import { OrderRequest } from '../../Models/OrderRequest.model';
import { AdminService } from '../../Services/Admin-service';
import { AuthService } from '../../Services/Auth/Auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  plans: IptvPlan[] = [];
  trials: FreeTrialRequest[] = [];
  orderRequests: OrderRequest[] = [];
  
  stats = {
    verifiedTrials: 0,
    pendingTrials: 0,
    totalOrderRequests: 0,
    uniqueClients: 0,
    totalRevenue: 0
  };

  loading = {
    plans: true,
    trials: true,
    orderRequests: true
  };

  errors = {
    plans: '',
    trials: '',
    orderRequests: ''
  };

  constructor(
    private adminService: AdminService,
    private auth: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
   
    this.loadData();
  }  

  loadData(): void {
    this.resetErrors();
    
    // Load IPTV Plans
    this.adminService.getPlans().subscribe({
      next: (plans) => {
        this.plans = plans;
        this.loading.plans = false;
      },
      error: (err) => {
        this.errors.plans = 'Failed to load plans. Please try again.';
        this.loading.plans = false;
        console.error('Error loading plans:', err);
      }
    });

    // Load Trial Requests
    this.adminService.getTrials().subscribe({
      next: (trials) => {
        console.log('Trials loaded:', trials); // Debug log
        this.trials = trials;
        this.updateTrialStats();
        this.loading.trials = false;
      },
      error: (err) => {
        console.error('Detailed error:', err); // Detailed error logging
        this.errors.trials = 'Failed to load trial requests. Please check console for details.';
        this.loading.trials = false;
      }
    });

    // Load Order Requests
    this.adminService.getOrderRequests().subscribe({
      next: (orders) => {
        this.orderRequests = orders;
        this.updateOrderStats();
        this.loading.orderRequests = false;
      },
      error: (err) => {
        this.errors.orderRequests = 'Failed to load order requests. Please try again.';
        this.loading.orderRequests = false;
        console.error('Error loading orders:', err);
      }
    });
  }

  private updateTrialStats(): void {
    this.stats.verifiedTrials = this.trials.filter(t => t.verified).length;
    this.stats.pendingTrials = this.trials.filter(t => !t.verified).length;
  }

  private updateOrderStats(): void {
    this.stats.totalOrderRequests = this.orderRequests.length;
    this.stats.uniqueClients = this.countUniqueClients();
    this.stats.totalRevenue = this.calculateTotalRevenue();
  }

  private countUniqueClients(): number {
    const uniqueEmails = new Set(this.orderRequests.map(order => order.clientInfo.email));
    return uniqueEmails.size;
  }

  private calculateTotalRevenue(): number {
    return this.orderRequests.reduce((sum, order) => sum + order.selectedPlan.price, 0);
  }

  private resetErrors(): void {
    this.errors = {
      plans: '',
      trials: '',
      orderRequests: ''
    };
  }

  refreshData(): void {
    this.loading = { plans: true, trials: true, orderRequests: true };
    this.loadData();
  }
}