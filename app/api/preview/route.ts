import { token } from '@/lib/sanity/sanity.fetch'
import { draftMode } from 'next/headers'

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

  if (secret !== process.env.SANITY_API_READ_TOKEN) {
    return new Response('Invalid token', { status: 401 })
  }

  draftMode().enable()

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