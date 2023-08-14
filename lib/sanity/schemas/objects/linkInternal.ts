import {LinkIcon} from '@sanity/icons'
import {defineField} from 'sanity'
import {PAGE_REFERENCES} from '../../constants'

export default defineField({
  title: 'Internal Link',
  name: 'linkInternal',
  type: 'object',
  description: 'Link to content on this site.',
  icon: LinkIcon,
  fields: [
    // Title
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'If empty, displays the current reference title.'
    }),
    // Reference
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Content reference',
      description: 'Link to already created, internal content.',
      weak: true,
      to: PAGE_REFERENCES,
    }),
  ],  
  preview: {
    select: {
      reference: 'reference',
      referenceTitle: 'reference.title',
      referenceType: 'reference._type',
      title: 'title',
    },
    prepare(selection) {
      const {
        reference,
        referenceTitle,
        title,
      } = selection

      let subtitle = []
      if (reference) {
        subtitle.push([`→ ${referenceTitle || reference?._id}`])
      } else {
        subtitle.push('(Nonexistent document reference)')
      }

      return {
        title,
        subtitle: subtitle.join(' '),
      }
    },
  },
})
