import { DocumentsIcon, EyeOpenIcon, MasterDetailIcon } from '@sanity/icons'
import { SanityDocument } from 'sanity'
import Iframe from 'sanity-plugin-iframe-pane'
import { ListItemBuilder } from 'sanity/desk'
import defineStructure from '../utils/define-structure'
import getPreviewUrl from '../utils/get-preview-url'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Pages')
    .schemaType('page')
    .icon(DocumentsIcon)
    .child (
      S.documentTypeList('page')
        .child (id =>
          S.document()
            .schemaType("page")
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