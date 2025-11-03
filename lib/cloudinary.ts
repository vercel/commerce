import crypto from 'node:crypto'

export function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || ''
  const apiKey = process.env.CLOUDINARY_API_KEY || ''
  const apiSecret = process.env.CLOUDINARY_API_SECRET || ''
  return { cloudName, apiKey, apiSecret }
}

export function createUploadSignature(params: Record<string, string | number>) {
  const { apiSecret } = getCloudinaryConfig()
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  const toSign = `${sorted}${apiSecret ? `&${'api_secret'}=${apiSecret}` : ''}`
  const signature = crypto.createHash('sha1').update(toSign).digest('hex')
  return signature
}


