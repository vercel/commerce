import {defineField} from 'sanity'
import { validateImage } from '../../utils/validation'

export default defineField({
  name: 'banner',
  type: 'object',
  title: 'Banner',
  description: 'Normally used in the top of a page to display current page information.',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'What do you want to convey?',
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
      description: 'Small text below title.'
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image',
      validation: (Rule) => validateImage(Rule, true)
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      text: 'text'
    },
    prepare(selection) {
      const {title, image, text} = selection
      
      return {
        title: `${title}`,
        subtitle: `Banner`,
        media: image
      }
    },
  },
})
