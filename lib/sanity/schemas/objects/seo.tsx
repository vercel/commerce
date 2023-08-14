import {defineField} from 'sanity'
import { validateImage } from '../../utils/validation'

export default defineField({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description: 'Optimise content for search engines.',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.max(50).warning('Longer titles may be truncated by search engines'),
      description: (
        <>
          A short and accurate title representative of the content on this page.<br />
          If empty, displays the current document title (<i>title</i>).
        </>
      ),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) =>
        Rule.max(150).warning('Longer descriptions may be truncated by search engines'),
      description: 'A brief description of the content on this page.'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'mainImage',
      validation: Rule => validateImage(Rule, false),
      description: 'A representative image of the content on this page.'
    }),
  ],
  validation: (Rule) => Rule.required(),
})
