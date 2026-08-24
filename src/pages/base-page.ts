import { Page } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}
}

/** Sauce Demo's data-test attributes are the product name, lowercased and hyphenated. */
export function slugify(productName: string): string {
  return productName.toLowerCase().replace(/\s+/g, "-");
}
