import { Page, Category, Brand } from './types'

export default {
  page: {
    get full(): Page {
      return {
        id: 'some-page',
        body: 'page body',
        name: 'page name',
        url: '/page-url',
        sort_order: 1,
      }
    },
  },
  category: {
    get full(): Category {
      return {
        entityId: 'category-id',
        name: 'Some category',
        path: 'some-category-path',
      }
    },
  },
  brand: {
    get full(): Brand {
      return {
        entityId: 'brand-id',
        name: 'Some brand',
        path: 'some-brand-path',
      }
    },
  },
}
