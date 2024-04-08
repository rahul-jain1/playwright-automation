class ThankyouPage {
  constructor(page) {
    this.page = page;
    this.orderID = page.locator("label[class=ng-star-inserted]");
    this.orderListingLink = page.locator(
      "label[routerlink='/dashboard/myorders']"
    );
  }

  async getOrderId() {
    const capturedOrderID = await this.orderID.textContent();
    const orderID = capturedOrderID.split(" ")[2];
    return orderID;
  }

  async navigateToOrderListing() {
    await this.orderListingLink.click();
  }
}

module.exports = { ThankyouPage };


