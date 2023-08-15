import Kodamera from '@/lib/sanity/components/icons/kodamera'
import { structure } from '@/lib/sanity/desk'
import { schemaTypes } from '@/lib/sanity/schemas'
import { documentInternationalization } from '@sanity/document-internationalization'
import { visionTool } from '@sanity/vision'
import { defineConfig, isDev } from 'sanity'
import { media } from 'sanity-plugin-media'
import { deskTool } from 'sanity/desk'

const devOnlyPlugins = [visionTool()]

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["settings", "home", "utilityMenu", "media.tag", ])

// console.log(process.env.SANITY_API_READ_TOKEN)

export default defineConfig({
  name: 'default',
  title: 'KM Storefront CMS',
  projectId: 'opfmivlh',
  basePath: '/studio',
  dataset: 'production',
  plugins: [
    deskTool({structure}),
    media(),
    ...(isDev ? devOnlyPlugins : []),
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
      // Optional
      // languageField: `language`, // defauts to "language"
      // Optional, requires access to the Publishing API
      // bulkPublish: true // defaults to false
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
