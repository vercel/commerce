import {EarthGlobeIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  title: 'External Link',
  name: 'linkExternal',
  type: 'object',
  icon: EarthGlobeIcon,
  description: 'Link to content on external site.',
  fields: [
    // Title
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Descriptive text for the content on this link.'
    }),
    // URL
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to websites, e-mail address or phone number.',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel']})
    }),
    // Open in a new window?
    defineField({
      title: 'Open in a new window?',
      name: 'newWindow',
      type: 'boolean',
      description: 'If set to true, opens the link in a new window.',
      initialValue: false,
    })
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare(selection) {
      const {title, url} = selection

      let subtitle = []
      if (url) {
        subtitle.push(`→ ${url}`)
      }

      return {
        title,
        subtitle: subtitle.join(' '),
      }
    },
  },
})
