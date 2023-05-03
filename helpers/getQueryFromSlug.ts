import { groq } from 'next-sanity'
import {
  homePageQuery,
  pageQuery,
} from '../lib/sanity/queries'

const getQueryFromSlug = (slugArray: string[], locale: string) => {
  const docQuery = {
    homePage: groq`${homePageQuery}`,
    page: groq`${pageQuery}`,
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

  if (slugStart === 'articles' && slugArray.length === 2) {
    docType = `article`
  } else if (slugStart === 'work' && slugArray.length === 2) {
    docType = `work`
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