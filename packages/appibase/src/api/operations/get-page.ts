export type Page = any
export type GetPageResult = { page?: Page }

export type PageVariables = {
  id: number
}

export default function getPageOperation() {
  function getPage(): Promise<GetPageResult> {
    console.log('GETTING PAGE');

    return Promise.resolve({})
  }
  return getPage
}
