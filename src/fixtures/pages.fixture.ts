import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { InventoryPage } from "../pages/inventory-page";
import { CartPage } from "../pages/cart-page";
import { CheckoutPage } from "../pages/checkout-page";

interface PageFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  /** Console errors captured during the test — auto-asserted empty at teardown. */
  consoleGuard: string[];
}

/**
 * Custom fixtures:
 *  - one lazily-constructed page object per page
 *  - a console guard that fails any test whose page throws an
 *    uncaught error or logs console.error (catches broken JS that
 *    functional assertions would miss)
 */
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  consoleGuard: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(`console.error: ${msg.text()}`);
        }
      });
      await use(errors);
      // eslint-disable-next-line playwright/no-standalone-expect -- fixture teardown runs inside the test lifecycle
      expect
        .soft(errors, "Page produced JS/console errors during the test")
        .toEqual([]);
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
