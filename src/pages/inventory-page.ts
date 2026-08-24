import { Page, Locator } from "@playwright/test";
import { BasePage, slugify } from "./base-page";

export class InventoryPage extends BasePage {
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryItems = page.locator(".inventory_item");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator(".inventory_item_price");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async goto() {
    await this.page.goto("/inventory.html");
  }

  async sortBy(value: string) {
    await this.sortDropdown.selectOption(value);
  }

  async visiblePrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((text) => parseFloat(text.replace("$", "")));
  }

  async addItemToCart(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${slugify(productName)}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
