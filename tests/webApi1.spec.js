const { test, expect, request } = require("@playwright/test");
const { log } = require("console");
const { ApiUtils } = require("../Utils/ApiUtils");

let apiUtils;
let orderID;
let token;

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

test("API testing", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("button[routerlink='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();

  const ordeList = page.locator("tbody tr");
  await ordeList.first().waitFor();
  const orderCount = await ordeList.count();

  for (let i = 0; i < orderCount; i++) {
    const expectedOrderID = await ordeList.nth(i).locator("th").textContent();
    if (expectedOrderID.includes(orderID)) {
      await ordeList.nth(i).locator("button").first().click();
      break;
    }
  }

  await expect(page.locator(".col-text")).toHaveText(orderID);
});
