import { test, expect } from "../../fixtures/pages.fixture";
import { products } from "../../utils/test-data";

test.describe("Inventory", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test("displays the full catalog @smoke", async ({ inventoryPage }) => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test("sorts by price low to high", async ({ inventoryPage }) => {
    await inventoryPage.sortBy("lohi");
    const prices = await inventoryPage.visiblePrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test("cart badge tracks added items", async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.bikeLight);
    await expect(inventoryPage.cartBadge).toHaveText("2");
  });
});
