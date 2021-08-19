const validateCookieExpire = (expire: unknown): number => {
  let expireInteger: number

  if (typeof expire === 'string') {
    expireInteger = parseFloat(expire)
  } else if (typeof expire === 'number') {
    expireInteger = expire
  } else {
    throw new TypeError(
      'expire must be a string containing a number or an integer.'
    )
  }

  if (expireInteger < 0) {
    throw new RangeError('expire must be non-negative.')
  }

  return expireInteger
}

export default validateCookieExpire
