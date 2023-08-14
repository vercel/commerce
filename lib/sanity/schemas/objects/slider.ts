
import {defineField} from 'sanity'
import {PackageIcon} from '@sanity/icons'
import {TagIcon, NumberIcon} from '@sanity/icons'

export default defineField({
  name: 'slider',
  type: 'object',
  title: 'Slider',
  icon: NumberIcon,
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
      description: 'Title displayed above slider items.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'sliderType',
      type: 'string',
      title: 'Slider type',
      initialValue: 'products',
      description: 'Select content type to display.',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Products', value: 'products'},
          {title: 'Categories', value: 'categories'},
        ],
        layout: 'radio'
      }
    },
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      description: 'Select products to display.',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      validation: Rule => Rule.custom((x:any, context:any) => {
        if (context.parent.sliderType == 'products' && context?.parent?.products?.length < 3 || context?.parent?.products?.length > 8) {
          return 'Must have between 3 and 8 items'
        }
        return true
      }),
      hidden: ({ parent }) => parent?.sliderType !== "products"
    },
    {
      title: 'Categories',
      name: 'categories',
      type: 'array',
      description: 'Select categories to display.',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
      validation: Rule => Rule.custom((x:any, context:any) => {
        if (context.parent.sliderType == 'categories' && context?.parent?.categories?.length < 3 || context?.parent?.categories?.length > 8) {
          return 'Must have between 3 and 8 items'
        }
        return true
      }),
      hidden: ({ parent }) => parent?.sliderType !== "categories"
    },
  ],
  preview: {
    select: {
      title: 'title',
      sliderType: 'sliderType',
      disabled: 'disabled'
    },
    prepare(selection) {
      const {title, sliderType, disabled} = selection
      
      return {
        title: `${title}`,
        media: sliderType === 'products' ? PackageIcon : TagIcon,
        subtitle: `${sliderType === 'products' ? 'Product' : 'Category'} slider ${disabled ? '(⚠️ Disabled)' : ''}`,
      }
    },
  },
})