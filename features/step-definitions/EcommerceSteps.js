const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../pageObjects/POManager");
const { expect } = require("@playwright/test");
const  playwright  = require("@playwright/test");


Given("Customer login to the account using {string} and {string}", {timeout: 100 * 10000}, async function (username, password) {
   
    const loginPage = this.poManager.getLoginPage();
    await loginPage.login(username, password);
  }
);

When("add product {string} to cart", {timeout: 100 * 10000}, async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.productName = productName;
  const listingPage = this.poManager.getListingPage();
  await listingPage.addToCart(productName);
});

Then("product {string} is added to cart", {timeout: 100 * 10000}, async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = this.poManager.getCartPage();
  const productExist = cartPage.validateProductInCart(productName);
  expect(productExist).toBeTruthy();
  await cartPage.checkout();
});

When("customer enters checkout details and place an Order", {timeout: 100 * 10000}, async function () {
  // Write code here that turns the phrase above into concrete actions
  const checkoutPage = this.poManager.getCheckoutPage();
  const productInCart = await checkoutPage.validateProductInCheckout();
  expect(await productInCart.trim()).toEqual(this.productName);
  await checkoutPage.checkoutDetails();
  await checkoutPage.placeOrder();
});

Then("order is placed and present in customer account",  {timeout: 100 * 10000},async function () {
  // Write code here that turns the phrase above into concrete actions
  const thankyouPage = this.poManager.getThankyouPage();
  const orderID = await thankyouPage.getOrderId();
  console.log(orderID);
  await thankyouPage.navigateToOrderListing();

  const orderListingPage = this.poManager.getOrderListingPage();
  await orderListingPage.navigateToOrderDetails(orderID);
  await expect(this.page.locator(".col-text")).toHaveText(orderID) ;
});
