/**
 * Desk structure overrides
 */
import {ListItemBuilder, StructureResolver} from 'sanity/desk'
import categories from './categoryStructure'
import home from './homeStructure'
import pages from './pageStructure'
import products from './productStructure'
import settings from './settingStructure'
import blurbs from './blurbStructure'
import sections from './sectionStructure'
import usps from './uspStructure'
import navigation from './navigationStructure'

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
    'utilityMenu'
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
      navigation(S, context),
      S.divider(),
      settings(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.divider(),
    ])
