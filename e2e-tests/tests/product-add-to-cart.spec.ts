import { expect, test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { ProductPage } from '../page-objects/ProductPage';

test.describe.only('add product to cart', () => {
  let homePage: HomePage;
  let productPage: ProductPage;

  // Before Hook
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);

    await homePage.visitMainPage();
  });

  test('Add to cart simple product', async ({ page }) => {
    await homePage.visitMainPage();
    await homePage.openProductPage();
    await productPage.addToCart();
    await expect(
      page.getByText('LIGHT CLOTH TAUPE BRIGHTLIGHT CLOTH TAUPE BRIGHT€139.00EUR1')
    ).toBeVisible();
  });

  test('Add to cart variant product', async ({ page }) => {
    await homePage.visitMainPage();
    await homePage.openVariantsCartPage();
    await productPage.selectVariant();
    await productPage.addToCart();
    await expect(
      page.getByText('LAVENDA Product VariantsLAVENDA Product Variants€22.95EUR1')
    ).toBeVisible();
  });
});
