import Commerce from '@chec/commerce.js'

const checPublicKey = process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY as string
const devEnvironment = process.env.NODE_ENV === 'development'

if (devEnvironment && !checPublicKey) {
  throw Error('A Chec public API key must be provided')
}

export const commerce = new Commerce(checPublicKey, devEnvironment)
