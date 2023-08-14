import { defineField, defineType } from "sanity"

export default defineType({
  name: 'mainImage',
  type: 'image',
  title: 'Main image',
  description: 'Select or upload image. Edit by using the `menu` icon. Modify by using the `crop` icon.',
  options: {
    hotspot: true,
    metadata: [
      'blurhash', // Default: included
      'lqip', // Default: included
      'palette', // Default: included
      'exif', // Default: not included
      'location', // Default: not included
    ],
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Note: Important for SEO and accessibility.',
    }),
  ],
})