import { Page, Locator } from "@playwright/test";
import { BasePage, slugify } from "./base-page";

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("#checkout");
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async removeItem(productName: string) {
    await this.page.locator(`[data-test="remove-${slugify(productName)}"]`).click();
  }
}
