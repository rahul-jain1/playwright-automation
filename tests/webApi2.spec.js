const { test, expect } = require("@playwright/test");
const exp = require("constants");

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("#userEmail").fill("test.user8@test.com");
  await page.locator("#userPassword").fill("Test@1234");
  await page.locator("[type='submit']").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });

  webContext = await browser.newContext({storageState : 'state.json'});


});

test("API testing Storage", async () => {
  //console.log(await page.locator(".card-body > h5").nth(0).textContent());

  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/")  

  let allProducts = await page.locator(".card-body > h5").allTextContents();

  let indexProd = allProducts.indexOf("ADIDAS ORIGINAL");

  await page.locator("text = Add to Cart").nth(indexProd).click();
  await page.locator("[routerlink='/dashboard/cart']").click();
  await page.locator("div li").first().waitFor();
  //await expect(page.locator(".cartSection h3")).toHaveText("ADIDAS ORIGINAL");
  const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator(".totalRow button").click();

  await expect(page.locator(".item__title")).toHaveText("ADIDAS ORIGINAL");

  await page.locator(".input.txt").nth(1).fill("123");
  await page.locator(".input.txt").nth(2).fill("Rahul Jain");
  await page.locator(".input.txt").nth(3).fill("rahulshettyacademy");
  await page.locator("[type='submit']").click();
  await expect(page.locator(".mt-1.ng-star-inserted")).toContainText(
    "Coupon Applied"
  );

  await page.locator("[placeholder='Select Country']").pressSequentially("Au");
  //await page.locator("span.ng-star-inserted").click();

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionCount; i++) {
    const countryName = await dropdown.locator("button").nth(i).textContent();

    if (countryName.trim() === "Australia") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator(".user__name label")).toHaveText(
    "test.user8@test.com"
  );

  await page.locator("text=Place Order").click();
  const capturedOrderID = await page
    .locator("label[class=ng-star-inserted]")
    .textContent();
  const orderID = capturedOrderID.split(" ")[2];

  //await page.pause();
  await page.locator("label[routerlink='/dashboard/myorders']").click();

  //await expect(page.locator("h1[class='ng-star-inserted']")).toContainText("Your Orders");
  const ordeList = page.locator("tbody tr");
  await ordeList.first().waitFor();
  const orderCount = await ordeList.count();

  for (let i = 0; i < orderCount; i++) {
    const expectedOrderID = await ordeList.nth(i).locator("th").textContent();
    if (expectedOrderID === orderID) {
      await ordeList.nth(i).locator("button").first().click();
      break;
    }
  }

  await expect(page.locator(".col-text")).toHaveText(orderID);
  //const allOrderList = await page.locator("[scope='row']").allTextContents();

  //expect(allOrderList).toContain(orderID);
});
