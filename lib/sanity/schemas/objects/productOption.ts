import {defineField} from 'sanity'

export default defineField({
  name: 'productOption',
  title: 'Product option',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Product option label.'
    }),
    defineField({
      name: 'hexColors',
      title: 'Color hex code',
      type: 'color',
      description: 'Hex color code for product option.',
      options: {
        disableAlpha: true
      }
    })
  ],
})
