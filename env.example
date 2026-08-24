import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { credentials } from "../utils/test-data";
import { STORAGE_STATE } from "../../playwright.config";

/**
 * Runs once before all UI projects. Logs in through the real UI and
 * persists the session to disk; every browser project then starts
 * already authenticated via `storageState`, saving a login per test.
 */
setup("authenticate and persist session", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  // eslint-disable-next-line playwright/no-standalone-expect -- `setup` is an aliased test()
  await expect(page).toHaveURL(/inventory\.html/);
  await page.context().storageState({ path: STORAGE_STATE });
});
