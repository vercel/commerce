import {CopyIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productVariant',
  title: 'Product variant',
  type: 'document',
  icon: CopyIcon,
  fields: [
    // Title
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Product variant title/name.'
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title,
      }
    },
  },
})
