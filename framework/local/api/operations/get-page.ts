export type Page = any
export type GetPageResult = { page?: Page }

export type PageVariables = {
  id: number
}

export default function getPageOperation() {
  function getPage(): Promise<GetPageResult> {
    return Promise.resolve({})
  }
  return getPage
}
