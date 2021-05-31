import * as Core from '@commerce/types/page'
export * from '@commerce/types/page'

export type Page = Core.Page

export type PageTypes = {
  page: Page
}

export type GetAllPagesOperation = Core.GetAllPagesOperation<PageTypes>
export type GetPageOperation = Core.GetPageOperation<PageTypes>
