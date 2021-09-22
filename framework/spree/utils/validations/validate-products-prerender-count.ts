const validateProductsPrerenderCount = (prerenderCount: unknown): number => {
  let prerenderCountInteger: number

  if (typeof prerenderCount === 'string') {
    prerenderCountInteger = parseInt(prerenderCount)
  } else if (typeof prerenderCount === 'number') {
    prerenderCountInteger = prerenderCount
  } else {
    throw new TypeError(
      'prerenderCount count must be a string containing a number or an integer.'
    )
  }

  if (prerenderCountInteger < 0) {
    throw new RangeError('prerenderCount must be non-negative.')
  }

  return prerenderCountInteger
}

export default validateProductsPrerenderCount
