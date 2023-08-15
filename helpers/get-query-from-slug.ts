import {
  categoryQuery,
  pageQuery,
  productQuery,
  searchPageQuery
} from '@/lib/sanity/queries';
import { groq } from 'next-sanity';

const getQueryFromSlug = (slugArray: string[], locale: string) => {
  const docQuery: { [index: string]: string } = {
    'product': groq`${productQuery}`,
    'category': groq`${categoryQuery}`,
    'page': groq`${pageQuery}`,
    'search': groq`${searchPageQuery}`
  }

  let docType = ''

  const [slugStart] = slugArray

  // We now have to re-combine the slug array to match our slug in Sanity.
  const queryParams = { 
    slug: `/${slugArray.join("/")}`,
    locale: locale
  };

  if (slugStart === `produkt` || slugStart === `product`) {
    docType = `product`
  } else if (slugStart === `kategori` || slugStart === `category`) {
    docType = `category`
  } else if (slugStart === `sok` || slugStart === `search`) {
    docType = `search`
  } else {
    docType = `page`
  }

  return {
    docType,
    queryParams,
    query: docQuery[docType],
  }
}

export default getQueryFromSlug