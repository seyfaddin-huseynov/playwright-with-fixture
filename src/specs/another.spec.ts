import { test, Page, expect } from "@playwright/test";

test.describe("playing around", () => {
  test.beforeEach(async () => {
    // please fill in necessary code to complete a before Each block
  });

  test("go to docs intro", async ({ page }) => {
    await page.goto("https://playwright.dev/docs/intro");
    

    const headers = page.locator('article [class*="anchor"]');
    expect(headers).toHaveText([
      "Introduction",
      "Installing Playwright",
      "What's Installed",
      "Running the Example Test",
      "Running the Example Test in UI Mode",
      "HTML Test Reports",
      "Updating Playwright",
      "System requirements",
      "What's next",
    ]);
  });

  test("testing communities", async ({ page }) => {
    await page.goto("https://dev-community.wilsonacademy.com/");
    const email = page.locator("input#email");
    const password = page.locator("input#password");
    const submit = page.locator("button#btn-login");
    await email.fill("uitester@wilsonlanguage.com");
    await password.fill("xsPVyd$MhHAgq9bQA7!5y9VU");
    const response = page.waitForResponse(
      "https://dev-community.wilsonacademy.com/user"
    );
    await submit.click();
    let data = JSON.parse(await (await response).text());
    expect(data.email).toEqual("uitester@wilsonlanguage.com");
    expect(data.name).toEqual("UI Tester");
  });
});
