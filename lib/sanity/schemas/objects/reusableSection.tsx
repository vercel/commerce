import {defineField} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineField({
  name: 'reusableSection',
  type: 'object',
  title: 'Reusable section',
  icon: BlockElementIcon,
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
    },
    {
      name: 'section',
      type: 'object',
      title: 'Section',
      description: 'Reference to an existing section (only 1 allowed).',
      fields: [
        {
          title: 'Existing section',
          name: 'existingSection',
          type: 'reference',
          to: [{type: 'section'}],
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      disabled: 'disabled',
    },
    prepare(selection) {
      const {title, disabled} = selection

      return {
        title: `${title}`,
        subtitle: `Reusable section ${disabled ? '(⚠️ Disabled)' : ''}`,
        media: BlockElementIcon,
      }
    },
  },
})
