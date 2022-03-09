import { GetPageOperation } from '@vercel/commerce/types/page'

export type Page = any
export type GetPageResult = { page?: Page }

export type PageVariables = {
  id: number
}

export default function getPageOperation() {
  async function getPage<T extends GetPageOperation>(): Promise<T['data']> {
    return Promise.resolve({})
  }
  return getPage
}
