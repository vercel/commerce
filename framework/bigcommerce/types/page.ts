import * as Core from '@commerce/types/page'
import { definitions } from '../api/definitions/store-content'

export * from '@commerce/types/page'

export type Page = definitions['page_Full']

export type PageTypes = {
  page: Page
}

export type GetAllPagesOperation = Core.GetAllPagesOperation<PageTypes>
export type GetPageOperation = Core.GetPageOperation<PageTypes>
