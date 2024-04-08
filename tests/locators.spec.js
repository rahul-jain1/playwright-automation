const { test, expect } = require("@playwright/test");

test("Locators Test", async({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Password").fill("test");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("test");
    await page.locator(".form-group input[name='name']").fill("Rahul");
    await page.locator("[name='email']").fill("Rahul");
    await page.getByRole("button",{name :'Submit'}).click();

    await page.getByRole("link",{name:'Shop'}).click();

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    //await page.pause();


})