import {HomeIcon} from '@sanity/icons'
import {defineField} from 'sanity'
import {languages} from '../../languages'
import {COMPONENT_REFERENCES} from '../../constants'

export default defineField({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
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
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Page title.',
      validation: (Rule) => Rule.required(),
    },
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
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const {title, language} = selection

      const currentLang = languages.find((lang) => lang.id === language)

      return {
        title: `${title}`,
        subtitle: `${currentLang ? currentLang.title : ''}`,
      }
    },
  },
})
