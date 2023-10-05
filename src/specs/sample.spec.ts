import { test as base } from "@playwright/test";
import { LandingPage } from "../pages/landing-page";

export const test = base.extend<{ landingPage: LandingPage }>({
  landingPage: async ({ page }, use) => {
    // Set up the fixture.
    const landingPage = new LandingPage(page);
    await landingPage.goto();

    // Use the fixture value in the test.
    await use(landingPage);
  },
});

test.beforeEach(async ({ landingPage }) => {
  // please fill in necessary code to complete a before Each block
  test.setTimeout(10000);
  landingPage.goto();
});

test("sample navigation to make sure framework functions", async ({ page }) => {
  // await page.goto("https://cnn.com");
});

test("Please complete a test that logs user in an application with given URL", async () => {});

test("Please complete a test that extacts a value from a table in given URL", async () => {});
