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
export { expect } from "@playwright/test";
