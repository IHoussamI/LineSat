export interface FreeTrialRequest {
  id: number;
  email: string;
  firstName: string | null;
  country: string;
  whatsappNumber: number;
  verified: boolean;
}
