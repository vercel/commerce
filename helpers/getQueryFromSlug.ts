import { groq } from 'next-sanity'
import {
  homePageQuery,
  pageQuery,
} from '../lib/sanity/queries'

const getQueryFromSlug = (slugArray = []) => {
  const docQuery = {
    homePage: groq`${homePageQuery}`,
    page: groq`${pageQuery}`,
  }

  let docType = ''

  if (slugArray.length === 0) {
    return {
      docType: 'home',
      queryParams: {},
      query: docQuery.homePage,
    }
  }

  const [slugStart] = slugArray

  // We now have to re-combine the slug array to match our slug in Sanity.
  let queryParams = { 
    slug: `/${slugArray.join('/')}`,
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