const baseUrl = 'http://pizza-backend-env.eba-xgwydg7k.us-east-1.elasticbeanstalk.com';

export const environment = {
  production: false,
  apiBaseUrl: baseUrl,
  loginUrl: `${baseUrl}/`,
  customerUrl: `${baseUrl}/customer/`,
  userUrl: `${baseUrl}/user/`,
  coupanUrl: `${baseUrl}/coupan/`,
  pizzaOrderUrl: `${baseUrl}/pizzaOrder/`,
  orderUrl: `${baseUrl}/order/`,
  pizzaUrl: `${baseUrl}/pizza/`
};
