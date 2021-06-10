export type Page = any
export type GetAllPagesResult = { pages: Page[] }

export default function getAllPagesOperation() {
  function getAllPages(): GetAllPagesResult {
    return {
      pages: [],
    }
  }
  return getAllPages
}
