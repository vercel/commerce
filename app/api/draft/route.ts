// route handler enabling draft mode
import { categoryQuery, homePageQuery, pageQuery, productQuery } from 'lib/sanity/queries';
import { client } from 'lib/sanity/sanity.client';
import { draftMode } from 'next/headers';

const draftSecret = process.env.NEXT_PUBLIC_SANITY_DRAFT_TOKEN

export async function GET(request: Request) {
// Enable Draft Mode by setting the cookie
draftMode().enable();
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');
  const type = searchParams.get('type');

  // Make sure there's a valid draft token.
  if (secret !== draftSecret) {
    return new Response('Invalid token', { status: 401 });
  }

  // Make sure there's a slug provided.
  if (!slug) {
    return new Response('No slug provided', { status: 401 });
  }

  // Make sure there's a locale provided.
  if (!locale) {
    return new Response('No locale provided', { status: 401 });
  }

   // Make sure there's a type provided.
   if (!type) {
    return new Response('No type provided', { status: 401 });
  }

  // Types available for preview - Check if the post with the given `slug` exists
  const home = await client.fetch(homePageQuery, {
    slug: slug,
    locale: locale,
  })

  const page = await client.fetch(pageQuery, {
    slug: slug,
    locale: locale,
  })

  const product = await client.fetch(productQuery, {
    slug: slug,
    locale: locale,
  })

  const category = await client.fetch(categoryQuery, {
    slug: slug,
    locale: locale,
  })


  draftMode().enable();

   // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  if (home && type === 'home') {
    return new Response(null, {
        status: 307,
        headers: {
            Location: `/${home.locale}/${home.slug}`,
        },
    })
  }

  if (page && type === 'page') {
    return new Response(null, {
        status: 307,
        headers: {
            Location: `/${page.locale}/${page.slug}`,
        },
    })
  }

  if (product && type === 'product') {
    return new Response(null, {
        status: 307,
        headers: {
            Location: `/${product.locale}/product/${product.slug}`,
        },
    })
  }

  if (category && type === 'category') {
    return new Response(null, {
        status: 307,
        headers: {
            Location: `/${category.locale}/category/${category.slug}`,
        },
    })
  }
}