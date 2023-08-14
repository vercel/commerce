import { PackageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { slugWithLocalizedType } from './slugWithLocalizedType';
import { languages } from '../../languages';
import { validateImage } from '../../utils/validation';

const GROUPS = [
  {
    name: 'editorial',
    title: 'Editorial'
  },
  {
    name: 'seo',
    title: 'SEO'
  }
];

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    // Language
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      description: 'Language of this document.'
      // hidden: true,
    }),
    // ID
    defineField({
      name: 'id',
      title: 'ID',
      type: 'number',
      description: 'Unique product ID.'
    }),
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Product title/name.',
      validation: (Rule) => Rule.required()
    }),
    // Slug
    slugWithLocalizedType('product', 'title'),
    defineField({
      name: 'images',
      title: 'Images',
      description: 'Images of this product, the first image will be used as main image.',
      type: 'array',
      of: [
        {
          title: 'Image',
          type: 'mainImage',
          validation: (Rule) => validateImage(Rule, true)
        }
      ],
      validation: (Rule) => Rule.required().min(1).max(5)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Product description.'
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      description: 'Product price information.',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'number',
          description: 'Product price.'
        }),
        defineField({
          name: 'currencyCode',
          title: 'Currency code',
          type: 'string',
          description: 'Product currency code.',
          options: {
            list: [
              { title: 'SEK', value: 'SEK' },
              { title: 'GBP', value: 'GBP' },
              { title: 'EUR', value: 'EUR' }
            ],
            layout: 'radio'
          },
          initialValue: 'SEK'
        }),
        defineField({
          name: 'retailPrice',
          title: 'Retail price',
          type: 'number',
          description: 'Product retail price.'
        })
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'What category/categories does this product belong to?',
      of: [{ type: 'reference', to: { type: 'category' } }]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo'
    })
  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Title (A-Z)',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      name: 'titleDesc',
      title: 'Title (Z-A)',
      by: [{ field: 'title', direction: 'desc' }]
    },
    {
      name: 'priceDesc',
      title: 'Price (Highest first)',
      by: [{ field: 'price', direction: 'desc' }]
    },
    {
      name: 'priceAsc',
      title: 'Title (Lowest first)',
      by: [{ field: 'price', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      images: 'images',
      title: 'title',
      language: 'language'
    },
    prepare(selection) {
      const { images, title, language } = selection;
      const currentLang = languages.find((lang) => lang.id === language);

      const firstImage = images[0];

      return {
        title,
        subtitle: `${currentLang ? currentLang.title : ''}`,
        media: firstImage ? firstImage : PackageIcon
      };
    }
  }
});
