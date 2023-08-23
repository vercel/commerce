import Kodamera from '@/lib/sanity/components/icons/kodamera'
import { structure } from '@/lib/sanity/desk'
import { schemaTypes } from '@/lib/sanity/schemas'
import { documentInternationalization } from '@sanity/document-internationalization'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { IframeOptions } from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'
import { media } from 'sanity-plugin-media'
import { deskTool } from 'sanity/desk'
import { apiVersion, dataset, previewSecretId, projectId } from './lib/sanity/sanity.api'
import category from './lib/sanity/schemas/documents/category'
import page from './lib/sanity/schemas/documents/page'
import product from './lib/sanity/schemas/documents/product'
import home from './lib/sanity/schemas/singletons/home'
import search from './lib/sanity/schemas/singletons/search'

const devOnlyPlugins = [visionTool({ defaultApiVersion: apiVersion})]

export const PREVIEWABLE_DOCUMENT_TYPES = [
  home.name,
  page.name,
  category.name,
  product.name,
  search.name
] satisfies string[]

// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = '/api/preview'

// export const urlResolver = defineUrlResolver({
//   base: PREVIEW_BASE_URL,
// })

// import {MissingSlug, type UrlResolver} from 'sanity-plugin-iframe-pane'

export const urlResolver = (document: any, urlSecret: any) => {
  const url = new URL(PREVIEW_BASE_URL, location.origin)
  url.searchParams.set('type', document._type)
  const lang = document?.language
  url.searchParams.set('locale', lang)
  const slug = (document?.slug as any)?.current
  if (slug) {
    url.searchParams.set('slug', slug)
  }
  
  if (urlSecret) {
    url.searchParams.set('secret', urlSecret)
  }
  return url.toString()
}

export const iframeOptions = {
  url: urlResolver,
  urlSecretId: previewSecretId,
} satisfies IframeOptions

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["settings", "home", "search", "utilityMenu", "media.tag", ])

// console.log(process.env.SANITY_API_READ_TOKEN)

export default defineConfig({
  name: 'default',
  title: 'KM Storefront CMS',
  projectId: projectId,
  basePath: '/studio',
  dataset: dataset,
  plugins: [
    // deskTool({structure}),
    deskTool({
      structure: structure,
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    // singletonPlugin([home.name, search.name]),

    // Add the "Open preview" action
    previewUrl({
      base: PREVIEW_BASE_URL,
      urlSecretId: previewSecretId,
      matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    media(),
    // ...(isDev ? devOnlyPlugins : []),
    documentInternationalization({
      // Required, either:
      // An array of supported languages
      supportedLanguages: [
        {id: 'sv', title: 'Swedish'},
        {id: 'en', title: 'English'}
      ],
      // Required
      schemaTypes: [
        'home',
        'page',
        'product',
        'category',
        'settings',
        'blurb',
        'section',
        'usp',
        'footerMenu',
        'utilityMenu',
        'search'
      ],
    }),
  ],
  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  studio: {
    components: {
      logo: Kodamera,
    }
  },
})
