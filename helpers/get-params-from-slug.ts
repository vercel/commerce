const getParamsFromSlug = (slugArray: string[], locale: string) => {
  let docType = ''

  const [slugStart] = slugArray

  // We now have to re-combine the slug array to match our slug in Sanity.
  const queryParams = { 
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
  }
}

export default getParamsFromSlug