import {
  categoryQuery,
  pageQuery,
  productQuery
} from '@/lib/sanity/queries'
import { groq } from 'next-sanity'

const getQueryFromSlug = (slugArray: string[], locale: string) => {
  const docQuery: { [index: string]: string } = {
    'product': groq`${productQuery}`,
    'category': groq`${categoryQuery}`,
    'page': groq`${pageQuery}`,
  }

  let docType = ''

  const [slugStart] = slugArray

  // We now have to re-combine the slug array to match our slug in Sanity.
  const queryParams = { 
    slug: `/${slugArray.join("/")}`,
    locale: locale
  };

  console.log("Query Params:", queryParams)

  if (slugStart === `produkt` || slugStart === `product`) {
    docType = `product`
  } else if (slugStart === `kategori` || slugStart === `category`) {
    docType = `category`
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