class ListingPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body > h5");
    this.addCartBtn = page.locator("text = Add to Cart");
    this.cartLink = page.locator("[routerlink='/dashboard/cart']");
  }

  async addToCart(productName) {
    let allProducts = await this.products.allTextContents();
    let indexProd = allProducts.indexOf(productName);
    await this.addCartBtn.nth(indexProd).click();
    await this.cartLink.click();
  }
}

module.exports = {ListingPage};