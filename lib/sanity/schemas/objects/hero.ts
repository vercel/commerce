import {defineField} from 'sanity'
import {StarIcon} from '@sanity/icons'
import { validateImage } from '../../utils/validation'

export default defineField({
  name: 'hero',
  type: 'object',
  title: 'Hero',
  icon: StarIcon,
  fieldsets: [
    {
      name: 'settings',
      title: 'Hero settings',
      description: 'Hero layout and semantic settings.',
      options: {
        collapsed: true,
        collapsible: true,
      },
    }
  ],
  fields: [
    {
      name: 'disabled',
      type: 'boolean',
      title: 'Disabled?',
      description: 'Set to true to disable this section.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Hero variant',
      initialValue: 'fullScreen',
      description: 'Choose display for larger screens: Full or half screen height.',
      validation: Rule => Rule.required(),
      fieldset: 'settings',
      options: {
        list: [
          {title: 'Full screen', value: 'fullScreen'},
          {title: '50% height', value: 'halfScreen'},
        ],
        layout: 'radio',
      }
    },
    {
      name: 'headingLevel',
      type: 'string',
      title: 'Heading level',
      initialValue: 'h1',
      fieldset: 'settings',
      description: 'Set appropriate heading level depending on the current document structure.',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      description: 'Small text displayed above title.'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'What you want to convey.',
      validation: Rule => [
        Rule.required(),
        Rule.max(50).warning('Shorter titles are usually better.')
      ]
    },
    {
      name: 'text',
      type: 'text',
      title: 'Text',
      rows: 5,
      description: 'Short text displayed below title.',
      validation: Rule => [
        Rule.max(100).warning('Strive to be short, precise and on point.')
      ]
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image',
      validation: Rule => validateImage(Rule, true),
      options: {
        hotspot: true,
        collapsed: false,
        collapsible: true,
      },
    },
    {
      name: 'link',
      type: 'linkInternal',
      title: 'Link',
      description: 'Link to internal page.',
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      disabled: 'disabled'
    },
    prepare(selection) {
      const {title, image, disabled} = selection
      
      return {
        title: `${title}`,
        media: image?.asset ? image : StarIcon,
        subtitle: `Hero ${disabled ? '(⚠️ Disabled)' : ''}`,
      }
    },
  },
})
