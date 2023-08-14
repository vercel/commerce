import {defineField} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {languages} from '../../languages'

export default defineField({
  name: 'section',
  type: 'document',
  title: 'Reusable section',
  icon: BlockElementIcon,
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
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'object',
      description: 'Reusable section to refer to from other pages.',
      fields: [
        defineField({
          name: 'sectionType',
          type: 'array',
          title: 'Section type',
          description: 'Select reusable component (only 1 allowed).',
          of: [
            {type: 'hero'},
            {type: 'filteredProductList'},
            {type: 'slider'},
            {type: 'blurbSection'},
            {type: 'uspSection'},
          ],
          validation: (Rule) => Rule.length(1),
        }),
      ],
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
        media: BlockElementIcon,
        subtitle: `${currentLang ? currentLang.title : ''}`,
      }
    },
  },
})
