import * as Core from '@vercel/commerce/types/page'
export * from '@vercel/commerce/types/page'

export type Page = Core.Page

export type PageTypes = {
  page: Page
}

export type GetAllPagesOperation = Core.GetAllPagesOperation<PageTypes>
export type GetPageOperation = Core.GetPageOperation<PageTypes>
