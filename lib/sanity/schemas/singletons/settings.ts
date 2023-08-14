import {CogIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'
import { languages } from '../../languages'

const TITLE = 'Settings'

export default defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'notFoundPage',
      title: '404 page',
    },
    {
      name: 'socialMedia',
      title: 'Social media',
    },
    {
      name: 'usps',
      title: 'USPs',
    },
    {
      name: 'contact',
      title: 'Contact',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      description: 'Language of this document.'
      // hidden: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Document title.',
    }),
    // Not found page
    defineField({
      name: 'notFoundPage',
      title: '404 page',
      type: 'object',
      group: 'notFoundPage',
      description: 'Information displayed on 404 page.',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'Page title displayed on 404 error page.',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 5,
          description: 'Text displayed adjacent to the title on 404 error page.'
        }),
        defineField({
          name: 'category',
          title: 'Category',
          type: 'reference',
          description: 'Category of products displayed on 404 error page.',
          weak: true,
          to: [
            {
              name: 'category',
              type: 'category',
            },
          ],
        }),
      ]
    }),
    // Contact
    defineField({
      name: 'contact',
      title: 'Contact options',
      type: 'object',
      group: 'contact',
      description: 'Contact options for your business.',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        // Selling points
        defineField({
          name: 'contactOption',
          title: 'Options (links)',
          description: 'Links, e-mail address and phone numbers.',
          type: 'array',
          of: [
            {type: 'linkExternal'},
          ],
        }),
      ],
    }),
    // Social media links
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      group: 'socialMedia',
      description: "Links to your business's social media accounts",
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        // Links
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          description: 'Facebook, Twitter and Instgram etc.',
          of: [
            {type: 'linkExternal'},
          ],
        }),
      ],
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
      description: 'Default SEO displayed for every page unless overwritten on page/document level.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language'
    },
    prepare(selection) {
      const {title, language} = selection;

      const currentLang = languages.find(lang => lang.id === language);
      
      return {
        title: `${title}`,
        subtitle: `${currentLang ? currentLang.title : ''}`,
      }
    },
  },
})
