const validateImagesSize = (size: unknown): string => {
  if (typeof size !== 'string') {
    throw new TypeError('size must be a string.')
  }

  if (!size.includes('x') || size.split('x').length != 2) {
    throw new Error("size must have two numbers separated with an 'x'")
  }

  return size
}

export default validateImagesSize
