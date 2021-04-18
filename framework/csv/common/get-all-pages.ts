import mock from './mock'
import { Page, CSVConfig } from './types'

interface GetAllPages {
  pages: Page[]
}

interface Parameters {
  config: CSVConfig
  preview?: boolean
}

const getAllPages = async (_parameters: Parameters): Promise<GetAllPages> => {
  return { pages: [mock.page.full] }
}

export default getAllPages
