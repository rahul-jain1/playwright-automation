const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("Validation Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("www.google.com.au");
  // await page.goBack();
  // await page.goForward();

  // Hiddeen Element
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  // Dialog box - accept or dismiss
  await page.locator("#alertbtn").click();
  page.on("dialog", (dialog) => dialog.accept());

  //Mouse hover event

  await page.locator("#mousehover").hover();
  await page.getByText("Top").click();

  // Handling Frames

  const framePage = page.frameLocator("#courses-iframe");
  await framePage.locator("li a[href*='lifetime']:visible").click();
  const text = await framePage.locator(".text h2").textContent();
  console.log(text.split(" ")[1]);
});

test("Screenshot Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "screenshotElement.jpg" });
  await page.locator("#hide-textbox").click();
  page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});


test.skip("Visual Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.screenshot()).toMatchSnapshot("screenshotOriginal.png");
    await page.locator("#displayed-text").toBeVisible();
    await page.locator("#hide-textbox").click();
    
    //await expect(page.locator("#displayed-text")).toBeHidden();
  });