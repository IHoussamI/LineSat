import { Injectable } from '@angular/core';

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
}