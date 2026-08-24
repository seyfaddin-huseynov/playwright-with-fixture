# Playwright E2E Test Framework

A production-style end-to-end testing framework built with [Playwright](https://playwright.dev) and TypeScript, demonstrating UI, API, accessibility, and visual regression testing against the [Sauce Demo](https://www.saucedemo.com) storefront.

## Features

- **Page Object Model** — abstract `BasePage` with typed page objects; specs never touch raw selectors
- **Custom fixtures** — page objects injected per test, plus an automatic **console guard** fixture that fails any test whose page throws uncaught JS errors
- **Storage-state authentication** — a `setup` project logs in once and persists the session; every browser project starts pre-authenticated (no repeated login per test)
- **Cross-browser + mobile** — Chromium, Firefox, WebKit, and Pixel 7 emulation as separate projects
- **API testing** — browserless tests via Playwright's `request` fixture (status codes, schema shape, POST echo)
- **Accessibility testing** — axe-core WCAG 2.1 A/AA scans via `@axe-core/playwright`
- **Visual regression** — `toHaveScreenshot` baselines with dynamic regions masked
- **Test data factories** — faker-powered builders instead of hardcoded data
- **Tagged smoke suite** — `@smoke` grep for fast pre-merge runs
- **Sharded CI** — GitHub Actions matrix (2 shards) with blob reports merged into a single HTML report artifact, plus a lint/typecheck job

## Project structure

```
src/
├── fixtures/
│   └── pages.fixture.ts      # custom test fixtures + console guard
├── pages/
│   ├── base-page.ts          # shared page-object behavior
│   ├── login-page.ts
│   ├── inventory-page.ts
│   ├── cart-page.ts
│   └── checkout-page.ts
├── specs/
│   ├── auth.setup.ts         # logs in once, saves storage state
│   ├── ui/                   # functional UI tests (all browsers)
│   ├── api/                  # pure API tests (no browser)
│   ├── a11y/                 # axe-core accessibility scans
│   └── visual/               # screenshot regression
└── utils/
    └── test-data.ts          # faker factories + credentials
```

## Getting started

```sh
npm ci
npx playwright install --with-deps
cp .env.example .env
npm test
```

## Useful commands

| Command | What it does |
| --- | --- |
| `npm test` | Run everything (all projects) |
| `npm run test:ui-mode` | Playwright UI mode (time-travel debugging) |
| `npm run test:smoke` | Only `@smoke`-tagged tests |
| `npm run test:chromium` | UI tests in Chromium only |
| `npm run test:api` | API tests only (fast, no browser) |
| `npm run test:a11y` | Accessibility scans |
| `npm run test:visual:update` | (Re)generate visual baselines |
| `npm run report` | Open the last HTML report |
| `npm run lint` / `npm run typecheck` | Static quality gates |

## CI

Every push/PR runs the suite sharded 2× on GitHub Actions, merges blob reports into one HTML report artifact, and runs ESLint + `tsc --noEmit` in a parallel quality job. Failed tests retain trace, video, and screenshot for debugging (`trace: retain-on-failure`).

## Notes

- Visual tests fail on their very first run by design — generate baselines with `npm run test:visual:update` and commit the snapshots.
- Credentials for the demo site live in `.env` (see `.env.example`); real projects would source these from CI secrets.
