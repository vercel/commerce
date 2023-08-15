import { SearchIcon } from '@sanity/icons';
import { defineField } from 'sanity';
import { languages } from '../../languages';
import { slugWithLocalizedType } from '../slugWithLocalizedType';

export default defineField({
  name: 'search',
  title: 'Search',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      description: 'Language of this document.'
      // hidden: true,
    }),
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Page title.',
      validation: (Rule) => Rule.required()
    },
    // Slug
    slugWithLocalizedType('search', 'title'),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    })
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
        title: `${title}`,
        subtitle: `${currentLang ? currentLang.title : ''}`
      };
    }
  }
});
