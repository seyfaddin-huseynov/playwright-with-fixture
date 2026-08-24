import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Automated accessibility scans with axe-core.
 * Scans are scoped to WCAG 2.1 A/AA rules.
 */
test.describe("Accessibility", () => {
  test("login page has no critical WCAG A/AA violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(
      critical,
      critical.map((v) => `${v.id}: ${v.help}`).join("\n"),
    ).toEqual([]);
  });
});
