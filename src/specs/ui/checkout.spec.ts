import { test, expect } from "../../fixtures/pages.fixture";
import { buildCheckoutCustomer, products } from "../../utils/test-data";

test.describe("Checkout", () => {
  test("full purchase flow from catalog to confirmation @smoke", async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.goto();
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.boltShirt);
    await inventoryPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(2);
    await cartPage.startCheckout();

    await checkoutPage.fillCustomerInfo(buildCheckoutCustomer());
    await expect(checkoutPage.summaryTotal).toContainText("Total");
    await checkoutPage.finish();

    await expect(checkoutPage.completeHeader).toHaveText(
      "Thank you for your order!",
    );
  });

  test("removing an item updates the cart", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.goto();
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.removeItem(products.backpack);
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});
