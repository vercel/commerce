/**
 * Desk structure overrides
 */
import { ListItemBuilder, StructureResolver } from 'sanity/desk'
import blurbs from './blurb-structure'
import categories from './category-structure'
import home from './home-structure'
import navigation from './navigation-structure'
import pages from './page-structure'
import products from './product-structure'
import search from './search-structure'
import sections from './section-structure'
import settings from './settings-structure'
import usps from './usp-structure'

/**
 * Desk structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom desk structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schemas progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'category',
    'home',
    'media.tag',
    'page',
    'product',
    'productVariant',
    'settings',
    'blurb',
    'section',
    'usp',
    'navigation',
    'footerMenu',
    'utilityMenu',
    'search'
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      home(S, context),
      pages(S, context),
      S.divider(),
      products(S, context),
      categories(S, context),
      S.divider(),
      blurbs(S, context),
      usps(S, context),
      sections(S, context),
      S.divider(),
      settings(S, context),
      search(S, context),
      navigation(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.divider(),
    ])
