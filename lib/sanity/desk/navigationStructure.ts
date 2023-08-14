import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {MenuIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
  .title('Navigation')
  .icon(MenuIcon)
  .child(
    S.list()
      // Sets a title for our new list
      .title('Navigation Documents')
      // Add items to the array
      // Each will pull one of our new documents/singletons
      .items([
        S.listItem()
          .title('Utility menu')
          .child(S.document().schemaType('utilityMenu').documentId('utilityMenu')),
        S.listItem()
          .title('Footer menus')
          .child(
            S.documentTypeList('footerMenu')
              .title('Footer menus')
              .child (
                S.document()
                  .schemaType("footerMenu")
              )
          ),
      ])
  ),
)