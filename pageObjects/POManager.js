const {LoginPage} = require('./LoginPage');
const {ListingPage} = require('./ListingPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {ThankyouPage} = require('./ThankyouPage');
const {OrderListingPage} = require('./OrderListingPage');


class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.listingPage = new ListingPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.thankyouPage = new ThankyouPage(this.page);
    this.orderListingPage = new OrderListingPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getListingPage() {
    return this.listingPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getThankyouPage() {
    return this.thankyouPage;
  }

  getOrderListingPage() {
    return this.orderListingPage;
  }
}


module.exports = {POManager};