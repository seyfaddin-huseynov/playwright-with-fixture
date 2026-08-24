import { test, expect } from "@playwright/test";

/**
 * Visual regression via Playwright's screenshot comparator.
 * First run generates baselines: `npm run test:visual:update`
 */
test.describe("Visual regression", () => {
  test("inventory page matches baseline", async ({ page }) => {
    await page.goto("/inventory.html");
    await expect(page).toHaveScreenshot("inventory.png", {
      fullPage: true,
      mask: [page.locator(".shopping_cart_badge")],
    });
  });
});
