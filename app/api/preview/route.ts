import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type')
  const locale = searchParams.get('locale')

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
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
  }

  if (type === 'page') {
    return new Response(null, {
        status: 307,
        headers: {
            Location: `/${locale}${slug}`,
        },
    })
  }
}