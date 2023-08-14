import {defineField} from 'sanity'
import {StarIcon} from '@sanity/icons'

export default defineField({
  name: 'uspSection',
  type: 'object',
  title: 'USP section',
  icon: StarIcon,
  fieldsets: [
    {
      name: 'layoutSettings',
      title: 'Layout settings'
    },
  ],
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
      description: 'Title will only be used internally.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'usps',
      type: 'array',
      title: 'USPs',
      description: 'Create USPs or refer to existing USP.',
      of: [
        {
          type: 'reference',
          to: [{
            type: 'usp',
          }],
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(4),
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
        subtitle: `USP section ${disabled ? '(⚠️ Disabled)' : ''}`,
        media: StarIcon,
      }
    },
  },
})
