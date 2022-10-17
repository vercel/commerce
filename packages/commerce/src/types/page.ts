export type Page = {
  /**
   * The unique identifier for the page.
   */
  id: string
  /**
   * Page name, as displayed on the storefront.
   */
  name: string
  /**
   * Relative URL on the storefront for this page.
   */
  url?: string
  /**
   * HTML or variable that populates this page’s `<body>` element, in default/desktop view. Required in POST if page type is `raw`.
   */
  body: string
  /**
   * If true, this page appears in the storefront’s navigation menu.
   */
  is_visible?: boolean
  /**
   * Order in which this page should display on the storefront. (Lower integers specify earlier display.)
   */
  sort_order?: number
}

/**
 * Operation to get all pages.
 */
export type GetAllPagesOperation = {
  data: { pages: Page[] }
}

export type GetPageOperation = {
  data: { page?: Page }
  variables: {
    /**
     * The unique identifier of the page.
     */
    id: string
  }
}
