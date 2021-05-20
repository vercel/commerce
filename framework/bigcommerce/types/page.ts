import { definitions } from '../api/definitions/store-content'

export * from '@commerce/types/page'

export type Page = definitions['page_Full']

export type GetAllPagesOperation = {
  data: { pages: Page[] }
}
