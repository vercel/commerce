import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';
import { findUpSync } from 'find-up';

// export const findEnv = () => findUpSync(process.env.ENV_FILE || ".env");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// dotenv.config({ path: findEnv() });
dotenv.config({ path: findUpSync(process.env.ENV_FILE || '.env') });
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const newLocal = 'http://localhost:3000';
const baseURL = process.env.BASE_E2E_URL || newLocal;

console.log('Running tests for: ', baseURL);

const config: PlaywrightTestConfig = {
  testDir: './tests',
  outputDir: './reports',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: process.env.CI ? 30000 : 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: false, //!!process.env.CI
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    testIdAttribute: 'data-testid',
    baseURL
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    }
  ]
};

export default config;
