import {MenuIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'menu',
  title: 'Menu',
  type: 'object',
  icon: MenuIcon,
  groups: [],
  fields: [
    // Links
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {type: 'linkInternal'},
        {type: 'linkExternal'},
      ],
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection;
      
      return {
        title: `${title}`,
      }
    },
  },
})
