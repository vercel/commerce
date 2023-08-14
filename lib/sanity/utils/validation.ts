import {Rule, Slug} from 'sanity'
import slug from 'slug'

// SLUG VALIDATION
export const validateSlug = (Rule: Rule) => {
  const MAX_LENGTH = 96

  return Rule.required().custom(async(value: Slug) => {
    const currentSlug = value && value.current
    
    if (!currentSlug) {
      return true
    }

    if (currentSlug.length >= MAX_LENGTH) {
      return `Must be less than ${MAX_LENGTH} characters.`
    }

    if (currentSlug !== slug(currentSlug, {lower: true})) {
      return 'Must be a valid slug.'
    }
    return true
  })
}

// IMAGE VALIDATION
export const validateImage = (Rule: Rule, isRequired: boolean = false) => {
  if (isRequired) {
    return Rule.required().custom((value: object | any) => {
      const currentImage = value && value.asset;
      const currentImageAlt = value && value.alt;

      if (!currentImage) {
        return true
      }

      if (!currentImageAlt) {
        return "Image and alt text is required."
      }
  
      return true
    })
  } else {
    return Rule.custom((value: object | any) => {
      const currentImage = value && value.asset;
      const currentImageAlt = value && value.alt;

      if (!currentImage) {
        return true
      }

      if (currentImage && !currentImageAlt) {
        return "Alt text is required."
      }
  
      return true
    })
  }
}