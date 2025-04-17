// src/environments/environment.ts
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080', // Your Spring Boot base URL
    endpoints: {
      auth: '/api/auth/authenticate',
      admin: {
        plans: '/api/admin/plans',
        trials: '/api/admin/free-trial',
        orders: '/api/admin/orders'
      }
    }
  };