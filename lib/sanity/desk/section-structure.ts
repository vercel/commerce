import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/define-structure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
  .title('Sections')
  .schemaType('section')
  .child (
    S.documentTypeList('section')
      .child (
        S.document()
          .schemaType("section")
      )
  )
)
