export interface IptvPlan {
    id: number;
    name: string;
    description: string;
    price: number;
    durationMonths: number;
    freeMonths: number;
    type: string;
    renewable: boolean;
  }
  