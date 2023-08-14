import {defineField} from 'sanity'

export default defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    {
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          },
        ],
      },
      // Paragraphs
      type: 'block',
    },
    // Custom blocks
    // {
    //   name: 'blockAccordion',
    //   type: 'module.accordion',
    // },
    // {
    //   name: 'blockCallout',
    //   type: 'module.callout',
    // },
    // {
    //   name: 'blockGrid',
    //   type: 'module.grid',
    // },
    // {
    //   name: 'blockImages',
    //   type: 'module.images',
    // },
    // {
    //   name: 'blockInstagram',
    //   type: 'module.instagram',
    // },
    // {
    //   name: 'blockProducts',
    //   type: 'module.products',
    // },
  ],
})
