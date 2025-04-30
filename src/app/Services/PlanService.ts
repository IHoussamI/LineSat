import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

interface Plan {
  id: number | null; 
  title: string;
  description: string;
  price: any;
}
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private selectedPlan: any;

  constructor(private http: HttpClient) {}

  setSelectedPlan(plan: any) {
    this.selectedPlan = plan;
  }
  
  getSelectedPlan() {
    return this.selectedPlan;
  }
  clearSelectedPlan(): void {
    this.selectedPlan = null;
    localStorage.removeItem('selectedPlan');
  }

  getPublicPlans() {
    return this.http.get<Plan[]>(
      `${environment.apiUrl}${environment.endpoints.publicPlans}`
    );
  }
}