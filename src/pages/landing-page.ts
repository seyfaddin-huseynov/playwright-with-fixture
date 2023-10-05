import type { Page, Locator } from '@playwright/test';

export class LandingPage {
  private readonly mainHeader: Locator;
  private readonly headline: Locator;

  constructor(public readonly page: Page) {
    this.mainHeader = this.page.locator('[class="container__title_url-text container_lead-package__title_url-text"]');
    this.headline = this.page.locator('.container__field-links.container_lead-package__field-links div a:nth-child(2) span');
  }

  async goto() {
    await this.page.goto('https://www.cnn.com/');
  }

  async checkHeaders() {
    await this.mainHeader.textContent();
    await this.headline.textContent();
  }

  // async remove(text: string) {
  //   const todo = this.todoItems.filter({ hasText: text });
  //   await todo.hover();
  //   await todo.getByLabel('Delete').click();
  // }

  // async removeAll() {
  //   while ((await this.todoItems.count()) > 0) {
  //     await this.todoItems.first().hover();
  //     await this.todoItems.getByLabel('Delete').first().click();
  //   }
  // }
}