import { groq } from 'next-sanity'
import {
  categoryQuery,
  homePageQuery,
  pageQuery,
  productQuery
} from '../lib/sanity/queries'

const getQueryFromSlug = (slugArray: string[], locale: string) => {
  const docQuery: { [index: string]: string } = {
    'homePage': groq`${homePageQuery}`,
    'product': groq`${productQuery}`,
    'category': groq`${categoryQuery}`,
    'page': groq`${pageQuery}`,
  }

  let docType = ''

  if (!slugArray) {
    return {
      docType: 'home',
      queryParams: {locale: locale},
      query: docQuery.homePage,
    }
  }

  const [slugStart] = slugArray

  // We now have to re-combine the slug array to match our slug in Sanity.
  let queryParams = { 
    slug: `/${slugArray.join('/')}`,
    locale: locale
  }

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