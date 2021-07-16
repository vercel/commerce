// TODO: define this type
export type Page = {
  // ID of the Web page.
  id: string
  // Page name, as displayed on the storefront.
  name: string
  // Relative URL on the storefront for this page.
  url?: string
  // HTML or variable that populates this page’s `<body>` element, in default/desktop view. Required in POST if page type is `raw`.
  body: string
  // If true, this page appears in the storefront’s navigation menu.
  is_visible?: boolean
  // Order in which this page should display on the storefront. (Lower integers specify earlier display.)
  sort_order?: number
}

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
