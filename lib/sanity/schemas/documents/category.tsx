import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { languages } from '../../languages';
import { validateImage } from '../../utils/validation';
import { slugWithLocalizedType } from '../slugWithLocalizedType';

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
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
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
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Category title.'
    }),
    // Slug
    slugWithLocalizedType('category', 'title'),
    // // Show banner
    // defineField({
    //   name: 'showBanner',
    //   title: 'Show banner',
    //   type: 'boolean',
    //   description: 'If disabled, category title will be displayed instead.',
    //   group: 'editorial',
    // }),
    // // Banner
    // defineField({
    //   name: 'banner',
    //   title: 'Banner',
    //   type: 'banner',
    //   hidden: ({document}) => !document?.showBanner,
    //   group: 'editorial',
    // }),
    // Image
    defineField({
      name: 'image',
      type: 'mainImage',
      title: 'Image',
      validation: (Rule) => validateImage(Rule, true)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Description of this category.'
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'number',
      description: 'Unique ID.'
    }),
    defineField({
      name: 'categoryId',
      title: 'Category ID',
      type: 'number',
      description: 'Unique category ID.'
    }),
    defineField({
      name: 'parentId',
      title: 'Parent ID',
      type: 'number',
      description: 'Unique parent category ID.'
    }),
    // SEO
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language'
    },
    prepare(selection) {
      const { title, language } = selection;
      const currentLang = languages.find((lang) => lang.id === language);

      return {
        title,
        subtitle: `${currentLang ? currentLang.title : ''}`,
        media: TagIcon
      };
    }
  }
});
