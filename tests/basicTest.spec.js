const { test, expect } = require("@playwright/test");

test("Browser Context Test", async ({ browser }, { page }) => {
  const context = await browser.newContext();
  const page1 = await context.newPage();
  await page1.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page1.title());
  await expect(page1).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page1.locator("#username").fill("rahul.jain");
  await page1.locator("[type='password']").fill("test1234");
  await page1.locator("#signInBtn").click();
  await expect(page1.locator("[style*='block']")).toHaveText(
    "Incorrect username/password."
  );

  await page1.locator("#username").fill("");
  await page1.locator("[type='password']").fill("");

  await page1.locator("#username").fill("rahulshettyacademy");
  await page1.locator("[type='password']").fill("learning");
  await page1.locator("#signInBtn").click();

  console.log(await page1.locator(".card-body a").nth(0).textContent());
  await expect(page1.locator(".card-body a").nth(0)).toContainText("iphone X");
});

test("Page Test", async ({ page }) => {
  await page.goto("https://www.target.com.au");
  console.log(await page.title());
  await expect(page).toHaveTitle("Target Online Shopping | Target Australia");
});

test("Login Test Site", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator(".text-reset").click();

  await page.locator("#firstName").fill("Test");
  await page.locator("#lastName").fill("User");
  await page.locator("#userEmail").fill("test.user10@test.com");
  await page.locator("#userMobile").fill("9876543211");
  await page.locator("[formcontrolname='occupation']").selectOption("Engineer");
  await page.locator("[value='Male']").check();
  await page.locator("#userPassword").fill("Test@1234");
  await page.locator("#confirmPassword").fill("Test@1234");
  await page.locator("[formcontrolname='required']").check();
  await page.locator("#login").click();

  await page.locator(".btn.btn-primary").click();

  await page.locator("#userEmail").fill("test.user8@test.com");
  await page.locator("#userPassword").fill("Test@1234");
  await page.locator("[type='submit']").click();
  await page.waitForLoadState("networkidle");
  //console.log(await page.locator(".card-body > h5").nth(0).textContent());
  console.log(await page.locator(".card-body > h5").allTextContents());
});

test("Child Window Handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='document']");

  const [newPage] = await Promise.all([context.waitForEvent("page"), documentLink.click()]);

  console.log(await newPage.locator(".im-para.red").textContent());
  await expect(newPage.locator(".im-para.red")).toContainText("mentor");
 

});
