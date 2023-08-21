// import { previewSecretId } from '@/lib/sanity/sanity.api'
// import { client } from '@/lib/sanity/sanity.client'
import { token } from '@/lib/sanity/sanity.fetch'
import { draftMode } from 'next/headers'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type')
  const locale = searchParams.get('locale')

  if (!token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.',
    )
  }

  if (!secret) {
    return new Response('Invalid secret', { status: 401 })
  }

  // const authenticatedClient = client.withConfig({ token })
  
  // const validSecret = await isValidSecret(
  //   authenticatedClient,
  //   previewSecretId,
  //   secret,
  // )

  // if (!validSecret) {
  //   return new Response('Invalid secret', { status: 401 })
  // }

  draftMode().enable()

  console.log(draftMode())

  if (type === 'home') {
    return new Response(null, {
        status: 307,
        headers: {
            Location: `/${locale}`,
        },
    })
  } else {
    return new Response(null, {
        status: 307,
        headers: {
            Location: `/${locale}${slug}`,
        },
    })
  }
}