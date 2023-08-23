import { iframeOptions } from '@/sanity.config'
import { EyeOpenIcon, MasterDetailIcon } from '@sanity/icons'
import Iframe from 'sanity-plugin-iframe-pane'
import { ListItemBuilder } from 'sanity/desk'
import defineStructure from '../utils/define-structure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Home')
    .schemaType('home')
    .child (
      S.documentList()
        .title('Home pages')
        .filter('_type == "home"')
        .child(id =>
          S.document()
            .schemaType("home")
            .id(id)
            .views([
              S.view.form().icon(MasterDetailIcon),
              S.view.component(Iframe).icon(EyeOpenIcon).options(iframeOptions).title('Preview')
          ])
        )
    )  
)
