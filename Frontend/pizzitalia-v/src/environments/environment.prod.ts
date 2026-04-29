const baseUrl = 'http://pizza-backend-env.eba-xgwydg7k.us-east-1.elasticbeanstalk.com';

export const environment = {
  production: true,
  apiBaseUrl: baseUrl,
  loginUrl: `${baseUrl}/`,
  customerUrl: `${baseUrl}/customer/`,
  userUrl: `${baseUrl}/user/`,
  coupanUrl: `${baseUrl}/coupan/`,
  pizzaOrderUrl: `${baseUrl}/pizzaorder/`,
  orderUrl: `${baseUrl}/order/`,
  pizzaUrl: `${baseUrl}/pizza/viewpizzalist`
};
