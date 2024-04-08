class OrderListingPage {
  constructor(page) {
    this.page = page;
    this.orderList = page.locator("tbody tr");
  }

  async navigateToOrderDetails(orderID) {
    await this.orderList.first().waitFor();
    const orderCount = await this.orderList.count();
    for (let i = 0; i < orderCount; i++) {
      const expectedOrderID = await this.orderList
        .nth(i)
        .locator("th")
        .textContent();
      if (expectedOrderID === orderID) {
        await this.orderList.nth(i).locator("button").first().click();
        break;
      }
    }
  }
}

module.exports = { OrderListingPage };
