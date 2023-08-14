import {defineField} from 'sanity'

export default defineField({
  name: 'productOptions',
  title: 'Product options',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'ID (string)',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Unique product option ID.'
    }),
    defineField({
      name: 'displayName',
      title: 'Display name',
      type: 'string',
      description: 'Name displayed for this collection of product options.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      description: 'What kind of values are available?',
      of: [{type: 'productOption'}],
      options: {},
      validation: Rule => Rule.required(),
    }),
  ],
})
