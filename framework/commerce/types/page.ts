// TODO: define this type
export type Page = any

export type PageTypes = {
  page: Page
}

export type GetAllPagesOperation<T extends PageTypes = PageTypes> = {
  data: { pages: T['page'][] }
}

export type GetPageOperation<T extends PageTypes = PageTypes> = {
  data: { page?: T['page'] }
  variables: { id: string }
}
