import Commerce from '@chec/commerce.js'

const commercejsPublicKey = process.env
  .NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY as string
const devEnvironment = process.env.NODE_ENV === 'development'

if (devEnvironment && !commercejsPublicKey) {
  throw Error('A Commerce.js public API key must be provided')
}

export const commerce = new Commerce(commercejsPublicKey, devEnvironment)
