const { test, expect, request } = require("@playwright/test");
const { log } = require("console");
const { ApiUtils } = require("../Utils/ApiUtils");

let apiUtils;
let orderID;
let token;
const fakeOrderPaylaod = { data: [], message: "No Orders" };

const loginPayload = {
  userEmail: "test.user8@test.com",
  userPassword: "Test@1234",
};

const orderPayload = {
  orders: [
    { country: "Australia", productOrderedId: "6581ca979fd99c85e8ee7faf" },
  ],
};

test.beforeAll(async () => {
  //Login API
  const apiContext = await request.newContext();
  apiUtils = new ApiUtils(apiContext, loginPayload);
  token = await apiUtils.getToken();
  orderID = await apiUtils.createOrder(orderPayload);
});

test("Network Intercepting", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakeOrderPaylaod);
      route.fulfill({
        response,
        body,
      });
    }
  );

  await page.locator("button[routerlink='/dashboard/myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );
  console.log(await page.locator(".mt-4").textContent());
});
