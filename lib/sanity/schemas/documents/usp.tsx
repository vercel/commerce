import { StarIcon } from '@sanity/icons';
import { defineField } from 'sanity';
import { languages } from '../../languages';

export default defineField({
  name: 'usp',
  title: 'USPs',
  type: 'document',
  icon: StarIcon,
  fields: [
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
      description: 'USP title',
      validation: (Rule) => Rule.required()
    }),
    // Image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'mainImage',
      description: 'USP icon'
    }),
    // Text
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'Small text displayed below title.',
      rows: 5
    })
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      language: 'language'
    },
    prepare(selection) {
      const { image, title, language } = selection;

      const currentLang = languages.find((lang) => lang.id === language);

      return {
        media: image,
        title,
        subtitle: `${currentLang ? currentLang.title : ''}`
      };
    }
  }
});
