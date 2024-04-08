class CheckoutPage {

  constructor(page) {
    this.page = page;
    this.product = page.locator(".item__title");
    this.ccDetails = page.locator(".input.txt");
    this.couponBtn = page.locator("[type='submit']");
    this.couponAppliedText = page.locator(".mt-1.ng-star-inserted");
    this.countryTextBox = page.locator("[placeholder='Select Country']");
    this.countryDropdown = page.locator(".ta-results");
    this.usernameLabel = page.locator(".user__name label");
    this.placeOrderBtn = page.locator("text=Place Order");
  }

  async validateProductInCheckout() {
    const productName = this.product.textContent();
    console.log(productName);
    return productName;
  }

  async checkoutDetails() {
    await this.ccDetails.nth(1).fill("123");
    await this.ccDetails.nth(2).fill("Rahul Jain");
    await this.ccDetails.nth(3).fill("rahulshettyacademy");
    await this.couponBtn.click();
    //await expect(this.couponAppliedText).toContainText("Coupon Applied");
    await this.couponAppliedText.waitFor();
    await this.countryTextBox.pressSequentially("Au");
    await this.countryDropdown.waitFor();
    const optionCount = await this.countryDropdown.locator("button").count();

    for (let i = 0; i < optionCount; i++) {
      const countryName = await this.countryDropdown
        .locator("button")
        .nth(i)
        .textContent();

      if (countryName.trim() === "Australia") {
        await this.countryDropdown.locator("button").nth(i).click();
        break;
      }
    }

    //await expect(this.usernameLabel).toHaveText("test.user8@test.com");
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }
}

module.exports = {CheckoutPage};
