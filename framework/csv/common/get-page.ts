import mock from './mock'
import { Page } from './types'

export interface GetPage {
  page: Page
}

const getPage = async (): Promise<GetPage> => {
  return { page: mock.page.full }
}

export default getPage
