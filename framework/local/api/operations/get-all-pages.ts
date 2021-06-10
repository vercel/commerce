export type Page = any
export type GetAllPagesResult = { pages: Page[] }

export default function getAllPagesOperation() {
  function getAllPages(): Promise<GetAllPagesResult> {
    return Promise.resolve({
      pages: [],
    })
  }
  return getAllPages
}
