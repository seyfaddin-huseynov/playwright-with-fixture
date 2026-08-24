import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export const STORAGE_STATE = path.join(__dirname, ".auth/user.json");

export default defineConfig({
  testDir: "./src/specs",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  reporter: process.env.CI
    ? [["list"], ["blob"], ["github"]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL ?? "https://www.saucedemo.com",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    viewport: { width: 1460, height: 800 },
  },
  projects: [
    // Logs in once and saves the session for all UI projects
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      testDir: "./src/specs/ui",
      dependencies: ["setup"],
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE },
    },
    {
      name: "firefox",
      testDir: "./src/specs/ui",
      dependencies: ["setup"],
      use: { ...devices["Desktop Firefox"], storageState: STORAGE_STATE },
    },
    {
      name: "webkit",
      testDir: "./src/specs/ui",
      dependencies: ["setup"],
      use: { ...devices["Desktop Safari"], storageState: STORAGE_STATE },
    },
    {
      name: "mobile-chrome",
      testDir: "./src/specs/ui",
      dependencies: ["setup"],
      use: { ...devices["Pixel 7"], storageState: STORAGE_STATE },
    },
    // Pure API tests — no browser context needed
    {
      name: "api",
      testDir: "./src/specs/api",
    },
    // Accessibility scans with axe-core
    {
      name: "a11y",
      testDir: "./src/specs/a11y",
      use: { ...devices["Desktop Chrome"] },
    },
    // Visual regression (pinned to one browser for stable pixels)
    {
      name: "visual",
      testDir: "./src/specs/visual",
      dependencies: ["setup"],
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE },
    },
  ],
});
