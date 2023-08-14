import {MenuIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'
import {languages} from '../../languages'

export default defineType({
  name: 'footerMenu',
  title: 'Footer menu',
  type: 'document',
  icon: MenuIcon,
  groups: [],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      description: 'Language of this document.',
      // hidden: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Menu title or designation for menu.',
    }),
    // Menu
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'menu',
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
