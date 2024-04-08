const { test, expect, request } = require("@playwright/test");
const { url } = require("inspector");

test("Security Test Request Intercept", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("test.user8@test.com");
    await page.locator("#userPassword").type("Test@1234");
    await page.locator("[value='Login']").click();
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(),response.status()));
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 
    await page.locator("button[routerlink*='myorders']").click();


  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=2343243242",
      })
  );

  await page.locator("button:has-text('View')").first().click();
  //await page.pause();
});
