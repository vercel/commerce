import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly variant: Locator;
  readonly variantText: Locator;
  readonly productOption: Locator;
  readonly miniCartLink: Locator;
  readonly productRemove: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByTestId('add-to-cart-button');
    this.variant = page.getByTestId('product-variant');
    this.variantText = page.getByTestId('product-variant-text');
    this.productOption = page.getByTestId('cart-product-options');
    this.miniCartLink = page.getByTestId('cart-button');
    this.productRemove = page.getByTestId('product-remove-button');
  }

  async addToCart() {
    await expect(async () => {
      await this.page.getByLabel('Add to cart').waitFor();
      await this.page.getByLabel('Add to cart').dispatchEvent('click');
      await expect(this.page.locator('div').filter({ hasText: /^My Cart$/ })).toBeVisible();
    }).toPass({
      // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe, .... Defaults to [100, 250, 500, 1000].
      intervals: [1_000, 2_000, 10_000],
      timeout: 60_000
    });
  }

  async selectVariant() {
    await this.page.getByRole('button', { name: 'M' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'blue' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  //  async changeProductVariant(){
  //     await
  //  }
}
