// order-request.model.ts

// Interface for the backend response structure
export interface BackendOrder {
  id: number;
  clientInfo: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    orderCount: number;
  };
  selectedPlan: {
    id: number;
    name: string;
    description: string;
    price: number;
    durationMonths: number;
    freeMonths: number;
    type: string;
    renewable: boolean;
  };
  orderDate: string;
}

// Interface for the frontend structure
export interface OrderRequest {
  id: number;
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    orderCount: number;
  };
  selectedPlan: {
    name: string;
    description: string;
    price: number;
    durationMonths: number;
    freeMonths: number;
  };
  orderDate: string;
}