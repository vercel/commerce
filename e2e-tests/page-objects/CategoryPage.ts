import { Page } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async changePage() {
    await this.page.waitForLoadState('networkidle');
    await this.page.getByLabel('Next page').click();
  }

  async checkCategoryFilter() {
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('link', { name: 'Price: High to low' }).click();
  }
}

// getByLabel('Pagination', { exact: true })
// getByLabel('Next page')

// getByRole('link', { name: 'Price: High to low' })
// getByRole('link', { name: 'Price: Low to high' })
// getByRole('link', { name: 'Latest arrivals' })
// getByRole('link', { name: 'Trending' })
