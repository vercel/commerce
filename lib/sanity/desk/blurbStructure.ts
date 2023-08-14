import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
  .title('Blurbs')
  .schemaType('blurb')
  .child (
    S.documentTypeList('blurb')
      .child (
        S.document()
          .schemaType("blurb")
      )
  )
)
