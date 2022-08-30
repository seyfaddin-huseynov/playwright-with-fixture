import { test, Page } from "@playwright/test";

test.describe("interview test", () => {
  test.beforeEach(async () => {
    // please fill in necessary code to complete a before Each block
  });

  test("sample navigation to make sure framework functions", async ({
    page,
  }) => {
    await page.goto("https://cnn.com");
  });

  test("Please complete a test that logs user in an application with given URL", async () => {});

  test("Please complete a test that extacts a value from a table in given URL", async () => {});
});
