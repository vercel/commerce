import {CommentIcon} from '@sanity/icons'
import {defineField} from 'sanity'
import {languages} from '../../languages'
import {validateImage} from '../../utils/validation'

export default defineField({
  name: 'blurb',
  title: 'Blurb',
  type: 'document',
  icon: CommentIcon,
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
      description: 'What do you want to convey?',
      validation: (Rule) => Rule.required(),
    }),
    // Image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'mainImage',
      validation: (Rule) => validateImage(Rule, true),
    }),
    // Text
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'Small text displayed below title.',
      rows: 5,
    }),
    // Link
    {
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        {
          name: 'linkType',
          type: 'string',
          title: 'Link type',
          initialValue: 'internal',
          description: 'Link to internal or external content.',
          validation: (Rule) => Rule.required(),
          options: {
            list: ['internal', 'external'],
            layout: 'radio',
          },
        },
        {
          name: 'internalLink',
          type: 'linkInternal',
          title: 'Internal link',
          hidden: ({parent}) => parent?.linkType !== 'internal',
          options: {
            collapsible: false,
          },
          validation: (Rule) =>
            Rule.custom((value: any, context: any) => {
              if (context.parent.linkType == 'internal') {
                const currentLink = value && value.reference
                if (!currentLink) {
                  return 'Reference is required'
                }
              }
              return true
            }),
        },
        {
          name: 'externalLink',
          type: 'linkExternal',
          title: 'External link',
          hidden: ({parent}) => parent?.linkType !== 'external',
          options: {
            collapsible: false,
          },
          validation: (Rule) =>
            Rule.custom((value: any, context: any) => {
              if (context.parent.linkType == 'external') {
                const currentTitle = value?.title
                const currentUrl = value?.url
                if (!currentTitle) {
                  return 'Title is required'
                } else if (!currentUrl) {
                  return 'URL is required'
                }
              }
              return true
            }),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      language: 'language',
    },
    prepare(selection) {
      const {image, title, language} = selection

      const currentLang = languages.find((lang) => lang.id === language)

      return {
        media: image,
        title,
        subtitle: `${currentLang ? currentLang.title : ''}`,
      }
    },
  },
})
