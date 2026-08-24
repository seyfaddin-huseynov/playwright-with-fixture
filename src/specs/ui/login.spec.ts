import { test, expect } from "../../fixtures/pages.fixture";
import { credentials } from "../../utils/test-data";

// These tests exercise the login form itself, so start unauthenticated.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Authentication", () => {
  test("valid credentials land on inventory @smoke", async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("locked-out user sees an error", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(credentials.lockedOutUsername, credentials.password);
    await expect(loginPage.errorMessage).toContainText("locked out");
  });

  test("empty credentials are rejected", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toContainText("Username is required");
  });
});
