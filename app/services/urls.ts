export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const URLS = {
  register: `${baseUrl}/auth/sign-up`,
  login: `${baseUrl}/auth/login`,
  changePassword: `${baseUrl}/users/change-password`,
  resetPassword: `${baseUrl}/users/reset-password`,
  orders: `${baseUrl}/orders`,
  getOrdersSummary: `${baseUrl}/orders/summary`,
  createBulkOrder: `${baseUrl}/orders/bulk-upload`,
  validateBulkOrders: `${baseUrl}/orders/validate-bulk-upload`,
  getRevenueValues: `${baseUrl}/orders/revenue`,
};
