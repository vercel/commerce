import {defineField} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export default defineField({
  name: 'blurbSection',
  type: 'object',
  title: 'Blurb section',
  icon: CommentIcon,
  fieldsets: [
    {
      name: 'layoutSettings',
      title: 'Layout settings',
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
      description: 'Text displayed above blurbs.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mobileLayout',
      type: 'string',
      title: 'Mobile layout',
      initialValue: 'stacked',
      fieldset: 'layoutSettings',
      description: 'Display blurbs stacked on top of each other or in a slider.',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {
            title: 'Vertical (1 column)',
            value: 'vertical',
          },
          {
            title: 'Horizontal (1 row with scroll)',
            value: 'horizontal',
          },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'desktopLayout',
      type: 'string',
      title: 'Desktop layout',
      initialValue: '3-column',
      fieldset: 'layoutSettings',
      description: 'Display blurbs in a 2- 3- or 4-column layout.',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {
            title: '2 columns',
            value: '2-column',
          },
          {
            title: '3 columns',
            value: '3-column',
          },
          {
            title: '4 columns',
            value: '4-column',
          },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'imageFormat',
      type: 'string',
      title: 'Blurb image format',
      initialValue: 'square',
      description: 'Choose format to display blurb images in.',
      validation: (Rule) => Rule.required(),
      fieldset: 'layoutSettings',
      options: {
        list: [
          {title: 'Square (1:1)', value: 'square'},
          {title: 'Portrait (3:4)', value: 'portrait'},
          {title: 'Landscape (16:9)', value: 'landscape'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'blurbs',
      type: 'array',
      title: 'Blurbs',
      description: 'Create blurbs or refer to existing blurbs.',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'blurb',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
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
        subtitle: `Blurb section ${disabled ? '(⚠️ Disabled)' : ''}`,
        media: CommentIcon,
      }
    },
  },
})
