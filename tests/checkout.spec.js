const { test, expect } = require("@playwright/test");
const exp = require("constants");
const {POManager} = require('../pageObjects/POManager');
const {customTest} = require('../Utils/test-base');

test("Checkout", async ({ page }) => {

  const username = "test.user8@test.com";
  const password = "Test@1234";
  const productName = "ADIDAS ORIGINAL";

  await page.goto("https://rahulshettyacademy.com/client/");
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.login(username,password);


  const listingPage = poManager.getListingPage();
  await listingPage.addToCart(productName);
  
  const cartPage = poManager.getCartPage();
  const productExist = cartPage.validateProductInCart(productName);
  expect(productExist).toBeTruthy();
  await cartPage.checkout();
  
  const checkoutPage = poManager.getCheckoutPage();
  const productInCart = await checkoutPage.validateProductInCheckout();
  expect(await productInCart.trim()).toEqual(productName);
  await checkoutPage.checkoutDetails();
  await checkoutPage.placeOrder();
  
  const thankyouPage = poManager.getThankyouPage();
  const orderID = await thankyouPage.getOrderId();
  console.log(orderID);
  await thankyouPage.navigateToOrderListing();

  const orderListingPage = poManager.getOrderListingPage();
  await orderListingPage.navigateToOrderDetails(orderID);


  //await expect(page.locator("h1[class='ng-star-inserted']")).toContainText("Your Orders");
  
  await expect(page.locator(".col-text")).toHaveText(orderID) ;
  //const allOrderList = await page.locator("[scope='row']").allTextContents();

  //expect(allOrderList).toContain(orderID);
});


customTest("Test Data Fixture", async ({ page,testData }) => {

  const username = "test.user8@test.com";
  const password = "Test@1234";
  const productName = "ADIDAS ORIGINAL";

  await page.goto("https://rahulshettyacademy.com/client/");
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.login(testData.username,testData.password);


  const listingPage = poManager.getListingPage();
  await listingPage.addToCart(testData.productName);

})