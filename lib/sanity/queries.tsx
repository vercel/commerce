export const docQuery = `*[_type in ["home", "page", "category", "product"] && defined(slug.current)] {
  _type,
  "slug": slug.current,
  "locale": language
}`

export const imageFields = `
  alt,
  crop,
  hotspot,
  asset-> {
    ...,
    _type,
    _ref,
  }
`

export const seoFields = `
  title,
  description,
  image {
    ${imageFields}
  }
`

// Construct our "Modules" GROQ
export const modules = `
  _type == 'hero' => {
    _type,
    _key,
    label,
    title,
    variant,
    headingLevel,
    text,
    link {
      title,
      reference->{title, slug, "locale": language}
    },
    image {
      ${imageFields}
    }
  },
  _type == 'filteredProductList' => {
    _type,
    _key,
    title,
    itemsToShow,
    productCategories[]->,
    "products": *[_type == "product" && count(categories[@._ref in ^.^.productCategories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0...12] {
      title,
      "slug": slug.current,
      price,
      images[] {
        ${imageFields}
      },
      price {
        value,
        currencyCode,
        retailPrice
      },
    }
  },
  _type == 'slider' => {
    _type,
    _key,
    title,
    sliderType,
    categories[]-> {
      title,
      "slug": slug.current,
      "locale": language,
      image {
        ${imageFields}
      },
    },
    products[]-> {
      id,
      title,
      "slug": slug.current,
      "locale": language,
      images[] {
        ${imageFields}
      },
      price {
        value,
        currencyCode,
        retailPrice
      },
    },
  },
  _type == 'banner' => {
    _type,
    _key,
    title,
    text,
    image {
      ${imageFields}
    }
  },
  _type == 'blurbSection' => {
    disabled,
    _type,
    _key,
    title,
    mobileLayout,
    desktopLayout,
    imageFormat,
    blurbs[]->{
      title,
      text,
      link {
        linkType,
        title,
        internalLink {
          reference->
        },
        externalLink {
          title,
          url,
          newWindow
        }
      },
      "locale": language,
      image {
        ${imageFields}
      },
    },
  },
  _type == 'uspSection' => {
    disabled,
    _type,
    _key,
    title,
    usps[]->{
      title,
      text,
      "locale": language,
      image {
        ${imageFields}
      },
    },
  }
`

// Homepage query
export const homePageQuery = `*[_type == "home" && slug.current == "/" && language == $locale][0] {
  _type,
  title,
  "slug": slug.current,
  "locale": language,
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    "locale": language
  },
  content[] {
    ${modules}
  },
  seo {
    ${seoFields}
  }
}`

// Page query
export const pageQuery = `*[_type == "page" && slug.current == $slug && language == $locale][0] {
  _type,
  title,
  "slug": slug.current,
  "locale": language,
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    "locale": language
  },
  content[] {
    ${modules}
  },
  seo {
    ${seoFields}
  }
}`

// Product query
export const productQuery = `*[_type == "product" && slug.current == $slug && language == $locale][0] {
  _type,
  title,
  "slug": slug.current,
  "locale": language,
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    "locale": language
  },
  "product": {
    id,
    "name": title,
    description,
    "descriptionHtml": "",
    images[] {
      ${imageFields}
    },
    price {
      value,
      currencyCode,
      retailPrice
    },
    options[] {
      id,
      displayName,
      values[] {
        label,
        "hexColors": hexColors.hex
      }
    },
    "variants": []
  },
  seo {
    ${seoFields}
  }
}`

// Category query
export const categoryQuery = `*[_type == "category" && slug.current == $slug && language == $locale][0] {
  _type,
  title,
  "slug": slug.current,
  "locale": language,
  showBanner,
  banner {
    _type,
    _key,
    title,
    text,
    image {
      ${imageFields}
    }
  },
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    "locale": language
  },
  seo {
    ${seoFields}
  }
}`

// Site settings query
export const siteSettingsQuery = `*[_type == "settings" && language == $locale][0] {
  menuMain {
    links[] {
      title,
      "link": reference->
    }
  },
  seo,
  socialMedia,
  "locale": language,
  notFoundPage {
    title,
    body,
    category->{title},
    "products": *[_type == "product" && ^.category->title in categories[]->title] | order(publishedAt desc, _createdAt desc) [0...4] {
      id,
      title,
      "slug": slug.current,
      price,
      images[] {
        ${imageFields}
      },
      price {
        value,
        currencyCode,
        retailPrice
      },
    }
  },
  cookieConsent {
    title,
    description,
    consentText,
    link {
      reference->
    }
  }
}`
