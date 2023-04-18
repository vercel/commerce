import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 600, height: 900 } });
test('should be able to open and close mobile menu', async ({ page }) => {
  let mobileMenu;

  await page.goto('/');

  await page.getByTestId('open-mobile-menu').click();
  mobileMenu = await page.getByTestId('mobile-menu');
  await expect(mobileMenu).toBeVisible();

  await page.getByTestId('close-mobile-menu').click();
  mobileMenu = await page.getByTestId('mobile-menu');
  await expect(mobileMenu).toBeHidden();
});
