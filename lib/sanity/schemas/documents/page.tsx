import {DocumentIcon} from '@sanity/icons'
import {defineField} from 'sanity'
import {languages} from '../../languages'
import {COMPONENT_REFERENCES} from '../../constants'
import {slugWithLocalizedType} from './slugWithLocalizedType'

export default defineField({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      description: 'Language of this document.',
      // hidden: true,
    }),
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Page title.',
      validation: (Rule) => Rule.required(),
    }),
    // Slug
    slugWithLocalizedType('page', 'title'),
    // Content
    defineField({
      name: 'content',
      title: 'Page sections',
      type: 'array',
      group: 'editorial',
      description: 'Add, reorder, edit or delete page sections.',
      of: COMPONENT_REFERENCES,
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      seoImage: 'seo.image',
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const {seoImage, title, language} = selection

      const currentLang = languages.find((lang) => lang.id === language)

      return {
        media: seoImage,
        title,
        subtitle: `${currentLang ? currentLang.title : ''}`,
      }
    },
  },
})
