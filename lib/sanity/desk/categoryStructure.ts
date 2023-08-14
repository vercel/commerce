import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import Iframe from 'sanity-plugin-iframe-pane'
import {SanityDocument} from 'sanity'
import {EyeOpenIcon, MasterDetailIcon} from '@sanity/icons'
import getPreviewUrl from '../utils/getPreviewUrl'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Categories')
    .schemaType('category')
    .child (
      S.documentTypeList('category')
        .child (id =>
          S.document()
            .schemaType("category")
            .id(id)
            .views([
              S.view
                .form()
                  .icon(MasterDetailIcon),
              S.view
                .component(Iframe)
                .icon(EyeOpenIcon) 
                .options({
                  url: (doc: SanityDocument) => getPreviewUrl(doc),
                })
                .title('Preview')
          ])
        )
      
    )
)
