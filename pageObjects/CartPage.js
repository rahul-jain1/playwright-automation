class CartPage {
  constructor(page) {
    this.page = page;
    this.productList = page.locator("div li");
    this.product = page.locator("h3:has-text('ADIDAS ORIGINAL')");
    this.checkoutBtn = page.locator(".totalRow button");
  }

  async validateProductInCart(productName) {
    await this.productList.first().waitFor();
    const bool = await this.page.locator("h3:has-text('$productName')").isVisible();
    return bool;
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}

module.exports = {CartPage};