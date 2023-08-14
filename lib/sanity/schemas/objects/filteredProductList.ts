import {defineField} from 'sanity'
import {FilterIcon} from '@sanity/icons'

export default defineField({
  name: 'filteredProductList',
  type: 'object',
  title: 'Filtered product list',
  icon: FilterIcon,
  fields: [
    {
      name: 'disabled',
      type: 'boolean',
      title: 'Disabled?',
      description: 'Set to true to disable this section.',
      initialValue: 'false',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Text displayed above product list.'
    },
    {
      name: 'productCategories',
      type: 'array',
      title: 'Product categories',
      description: 'Select category/categories to display products from.',
      of: [
        {
          type: 'reference',
          to: [{
            type: 'category',
          }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'itemsToShow',
      type: 'number',
      title: 'Number of products',
      initialValue: 4,
      description: 'Amount of products to be displayed.',
      validation: (Rule) => Rule.required(),
      options: {
        list: [4, 8, 12],
        layout: 'radio',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      disabled: 'disabled'
    },
    prepare(selection) {
      const {title, disabled} = selection
      
      return {
        title: `${title}`,
        subtitle: `Filtered product list ${disabled ? '(⚠️ Disabled)' : ''}`,
        media: FilterIcon
      }
    },
  },
})
