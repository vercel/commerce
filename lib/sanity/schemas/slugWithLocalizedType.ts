import { Rule, Slug } from 'sanity';
import slugify from "slugify";
import { i18n } from "../languages";
import { localizedTypes } from "../localizedTypes";

const MAX_LENGTH = 96

function formatSlug(input: string, docType: string, context: any, schemaType: object | any) {
  const locale = schemaType?.parent?.language ? schemaType?.parent?.language : i18n.base;

  let currentDocType: any;

  currentDocType = localizedTypes.find(item => item.type === docType);
  const currentDocTypeLocalized = currentDocType[locale];

  const slugStart = currentDocTypeLocalized ? `/${currentDocTypeLocalized}/` : `/`;
  const slug = slugify(input, { lower: true });

  return slugStart + slug;
}

export function slugWithLocalizedType(documentType = '', source = `title`) {
  const docType = documentType;

  return {
    name: `slug`,
    type: `slug`,
    options: {
      source,
      slugify: (value: any, context: any, schemaType: object | any) => formatSlug(value, docType, context, schemaType),
    },
    validation: (Rule: Rule) => {
      return Rule.required().custom(async (value: Slug) => {
        
        const currentSlug = value && value.current
        
        if (!currentSlug) {
          return true
        }
    
        if (currentSlug.length >= MAX_LENGTH) {
          return `Must be less than ${MAX_LENGTH} characters`
        }
    
        if (currentSlug.length === 0) {
          return 'Slug cannot be empty'
        }

        if (currentSlug.endsWith("/")) {
          return 'Slug cannot end with "/"'
        }
        return true
      })
    } 
  };
}