const validateImagesOptionFilter = (
  optionTypeNameOrFalse: unknown
): string | false => {
  if (!optionTypeNameOrFalse || optionTypeNameOrFalse === 'false') {
    return false
  }

  if (typeof optionTypeNameOrFalse === 'string') {
    return optionTypeNameOrFalse
  }

  throw new TypeError('optionTypeNameOrFalse must be a string or falsy.')
}

export default validateImagesOptionFilter
