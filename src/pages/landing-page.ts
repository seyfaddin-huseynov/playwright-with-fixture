import type { Page, Locator } from "@playwright/test";

export class LandingPage {
  private readonly mainHeader: Locator;
  private readonly headline: Locator;

  constructor(public readonly page: Page) {
    this.mainHeader = this.page.locator(
      '[class="container__title_url-text container_lead-package__title_url-text"]'
    );
    this.headline = this.page
      .locator(
        ".container__field-links.container_lead-package__field-links div a:nth-child(2) span"
      )
      .first();
  }

  async goto() {
    await this.page.goto("https://www.cnn.com/");
  }
  async url() {
    return this.page.url();
  }

  async getHeaders() {
    return { main: this.mainHeader, headline: this.headline };
  }
}
