export const environment = {
    production: true,
    apiUrl: 'https://api.line-sat.com', 
    endpoints: {
      auth: '/api/auth/authenticate',
      publicPlans: '/api/plans/public', 
      admin: {
        plans: '/api/admin/plans',
        trials: '/api/admin/free-trial',
        orders: '/api/admin/orders'
      }
    } 
  };