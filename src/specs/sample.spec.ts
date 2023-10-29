import { test, expect } from "../utils/base";
import { Page } from "@playwright/test";

test("sample navigation to make sure framework functions", async ({
  landingPage,
}) => {
  expect(await landingPage.url()).toBe("https://www.cnn.com/");
  const headline = (await landingPage.getHeaders()).headline;
  const mainHeader = (await landingPage.getHeaders()).main;
  await expect(headline).toBeVisible();
  await expect(mainHeader).toBeVisible();
});

