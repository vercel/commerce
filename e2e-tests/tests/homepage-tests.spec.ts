import { expect, test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';

test.describe.only('CMS links', () => {
  let homePage: HomePage;

  // Before Hook
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    await homePage.visitMainPage();
  });

  test('Footer CMS links verification', async ({ page }) => {
    await homePage.visitMainPage();
    await homePage.goToCmsPages();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveTitle(
      'Defective Product | Next.js Commerce with Shopware Composable Frontends'
    );
  });

  test('Home page slider verification', async ({ page }) => {
    await homePage.visitMainPage();
    await page.locator("ul[class='flex animate-carousel gap-4']").isVisible();
  });
});
