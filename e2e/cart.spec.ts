import { test, expect } from '@playwright/test';

const regex = (text: string) => new RegExp(text, 'gim');

test('should be able to open and close cart', async ({ page }) => {
  let cart;

  await page.goto('/');

  await page.getByTestId('open-cart').click();
  cart = await page.getByTestId('cart');
  await expect(cart).toBeVisible();
  await expect(cart).toHaveText(regex('your cart is empty'));

  await page.getByTestId('close-cart').click();
  cart = await page.getByTestId('cart');
  await expect(cart).toBeHidden();
});

test('should be able to add item to cart, without selecting a variant, assuming first variant', async ({
  page
}) => {
  await page.goto('/');
  await page.getByTestId('homepage-products').locator('a').first().click();

  const productName = await page.getByTestId('product-name').first().innerText();
  const firstVariant = await page.getByTestId('variant').first().innerText();

  await page.getByRole('button', { name: regex('add to cart') }).click();

  const cart = await page.getByTestId('cart');

  await expect(cart).toBeVisible();

  const cartItems = await page.getByTestId('cart-item').all();
  let isItemInCart = false;

  for (const item of cartItems) {
    const cartProductName = await item.getByTestId('cart-product-name').innerText();
    const cartProductVariant = await item.getByTestId('cart-product-variant').innerText();

    if (cartProductName === productName && cartProductVariant === firstVariant) {
      isItemInCart = true;
      break;
    }
  }

  await expect(isItemInCart).toBe(true);
});

test('should be able to add item to cart by selecting a variant', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('homepage-products').locator('a').first().click();

  const selectedProductName = await page.getByTestId('product-name').first().innerText();
  const secondVariant = await page.getByTestId('variant').nth(1);

  await secondVariant.click();
  const selectedProductVariant = await page.getByTestId('selected-variant').innerText();

  await page.getByRole('button', { name: regex('add to cart') }).click();

  const cart = await page.getByTestId('cart');

  await expect(cart).toBeVisible();

  const cartItem = await page.getByTestId('cart-item').first();
  const cartItemProductName = await cartItem.getByTestId('cart-product-name').innerText();
  const cartItemProductVariant = await cartItem.getByTestId('cart-product-variant').innerText();

  await expect(cartItemProductName).toBe(selectedProductName);
  await expect(cartItemProductVariant).toBe(selectedProductVariant);
});
