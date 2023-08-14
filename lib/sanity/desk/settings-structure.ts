import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/define-structure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
  .title('Settings')
  .schemaType('settings')
  .child (
    S.documentTypeList('settings')
      .child (
        S.document()
          .schemaType("settings")
      )
  )
)
