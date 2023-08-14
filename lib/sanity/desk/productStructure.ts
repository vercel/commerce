import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import Iframe from 'sanity-plugin-iframe-pane'
import {SanityDocument} from 'sanity'
import {EyeOpenIcon, MasterDetailIcon} from '@sanity/icons'
import getPreviewUrl from '../utils/getPreviewUrl'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Products')
    .schemaType('product')
    .child (
      S.documentTypeList('product')
        .child (id =>
          S.document()
            .schemaType("product")
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

// @TODO -  FIX THIS STRUCTURE.
// export default defineStructure<ListItemBuilder>((S) =>
//   S.listItem()
//     .title('Products')
//     .schemaType('product')
//     .child(
//       S.documentTypeList('product')
//         // .defaultLayout('detail')
//         .child(async (id) =>
//           S.list()
//             .title('Product')
//             .items([
//               // Details
//               S.listItem()
//                 .title('Details')
//                 .icon(InfoOutlineIcon)
//                 .child(S.document().schemaType('product').documentId(id)),
//               // Product variants
//               S.listItem()
//                 .title('Variants')
//                 .schemaType('productVariant')
//                 .child(
//                   S.documentList()
//                     .title('Variants')
//                     .schemaType('productVariant')
//                     .filter(
//                       `
//                       _type == "productVariant"
//                       && store.productId == $productId
//                     `
//                     )
//                     .params({
//                       productId: Number(id.replace('shopifyProduct-', '')),
//                     })
//                 ),
//             ])
//         )
//     )
// )
