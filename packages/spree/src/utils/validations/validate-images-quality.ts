const validateImagesQuality = (quality: unknown): number => {
  let quality_level: number

  if (typeof quality === 'string') {
    quality_level = parseInt(quality)
  } else if (typeof quality === 'number') {
    quality_level = quality
  } else {
    throw new TypeError(
      'prerenderCount count must be a string containing a number or an integer.'
    )
  }

  if (quality_level === NaN) {
    throw new TypeError(
      'prerenderCount count must be a string containing a number or an integer.'
    )
  }

  return quality_level
}

export default validateImagesQuality
