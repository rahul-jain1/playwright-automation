const { Before, After } = require("@cucumber/cucumber");
const { POManager } = require("../../pageObjects/POManager");
const playwright = require("@playwright/test");

Before( {timeout: 100 * 10000},async function () {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  await this.page.goto("https://rahulshettyacademy.com/client/");
  this.poManager = new POManager(this.page);
});


After(async function () {
    console.log("After Tests");
  });
