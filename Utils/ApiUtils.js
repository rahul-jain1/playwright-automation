class ApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );
    const loginResponseJson = await loginResponse.json();
    const token = await loginResponseJson.token;
    return token;
  }

  async createOrder(orderPayload) {

      const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: { Authorization: await this.getToken(), "Content-Type": "application/json" },
      }
    );

    const orderResponseJson = await orderResponse.json();
    const orderID = orderResponseJson.orders;
    console.log(orderResponseJson.orders[0]);
    return orderID;
  }
}

module.exports = {ApiUtils};
