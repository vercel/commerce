import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
  .title('USPs')
  .schemaType('usp')
  .child (
    S.documentTypeList('usp')
      .child (
        S.document()
          .schemaType("usp")
      )
  )
)