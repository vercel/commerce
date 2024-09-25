//---------------------------------------------------------------------------------------------------------------------------------------------------------------\\
/**
 * Generates test identifiers for a grid item, reflecting the product elements.
 * @param itemSize - The size of the grid item ('full' or 'half').
 * @param itemIndex - Optional index of the item in the grid.
 * @returns An object containing test identifiers mapped to product elements in the grid.
 */
function generateGridItemTestIds(itemSize?: 'full' | 'half' | undefined, itemIndex?: number) {
  const size = itemSize !== undefined ? `-${itemSize}` : '';
  const suffix = itemIndex !== undefined ? `-${itemIndex}` : '';
  const itemSelector = `[data-test^="grid-item${size}${suffix}"]`;

  return {
    container: itemSelector,
    product: {
      link: `${itemSelector} > [data-test="product-link"]`,
      image: `${itemSelector} > [data-test="product-link"] > [data-test="tile-container"] > [data-test="tile-image"]`,
      name: `${itemSelector} > [data-test="product-link"] > [data-test="tile-container"] > [data-test="label-container"] > [data-test="label-content-wrapper"] > [data-test="label-title-text"]`,
      price: {
        amount: `${itemSelector} > [data-test="product-link"] > [data-test="tile-container"] > [data-test="label-container"] > [data-test="label-content-wrapper"] > [data-test="price-amount"]`,
        currencyCode: `${itemSelector} > [data-test="product-link"] > [data-test="tile-container"] > [data-test="label-container"] > [data-test="label-content-wrapper"] > [data-test="price-currency-code"]`
      }
    }
  };
}

/**
 * Generates test identifiers for a carousel item, reflecting the product elements.
 * @param itemIndex - The index of the item in the carousel.
 * @returns An object containing test identifiers mapped to product elements in the carousel.
 */
function generateCarouselItemTestIds(itemIndex: number) {
  const itemSelector = `[data-test="carousel-item-${itemIndex}"]`;

  return {
    container: itemSelector,
    product: {
      link: `${itemSelector} > [data-test="product-link"]`,
      image: `${itemSelector} > [data-test="tile-container"] > [data-test="tile-image"]`,
      name: `${itemSelector} > [data-test="tile-container"] > [data-test="label-container"] > [data-test="label-content-wrapper"] > [data-test="label-title-text"]`,
      price: {
        amount: `${itemSelector} > [data-test="tile-container"] > [data-test="label-container"] > [data-test="label-content-wrapper"] > [data-test="price-amount"]`,
        currencyCode: `${itemSelector} > [data-test="tile-container"] > [data-test="label-container"] > [data-test="label-content-wrapper"] > [data-test="price-currency-code"]`
      }
    }
  };
}

export const DATA_TEST_SELECTORS = {
  productGridSection: {
    container: '[data-test="three-item-grid"]',
    items: (size?: 'full' | 'half' | undefined, index?: number) =>
      generateGridItemTestIds(size, index)
  },
  productCarouselSection: {
    container: '[data-test="carousel-container"]',
    items: (index: number) => generateCarouselItemTestIds(index)
  }
} as const;
