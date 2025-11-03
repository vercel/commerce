import { NextResponse } from 'next/server'
import { createUploadSignature, getCloudinaryConfig } from '@/lib/cloudinary'

export async function GET() {
  const { apiKey, cloudName } = getCloudinaryConfig()
  const timestamp = Math.floor(Date.now() / 1000)
  const folder = 'afghan-art-market'
  const signature = createUploadSignature({ folder, timestamp })
  return NextResponse.json({ timestamp, folder, signature, apiKey, cloudName })
}


