export const imageFields = `
  alt,
  crop,
  hotspot,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  asset-> {
    _id,
    assetId,
    metadata,
    _type,
    _ref,
    _rev
  }
`;

export const seoFields = `
  title,
  description,
  image {
    ${imageFields}
  }
`;

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
    color,
    overlay,
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
      _type,
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
`;
export const reusableSection = `
  _type == 'reusableSection' => {
    disabled,
    _type,
    title,
    section {
      existingSection-> {
        section {
          sectionType[] {
            ${modules}
          }
        }
      }
    }
  }
`;

// Homepage query
export const homePageQuery = `*[_type == "home" && language == $locale][0] {
  _type,
  title,
  "locale": language,
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    "locale": language
  },
  content[] {
    ${modules},
    ${reusableSection}
  },
  seo {
    ${seoFields}
  }
}`;

export const searchPageQuery = `*[_type == "search" && language == $locale][0] {
  _type,
  title,
  "locale": language,
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    "locale": language
  },
  seo {
    ${seoFields}
  }
}`;

// Page query
export const pageQuery = `*[_type == "page" && slug.current == $slug && language == $locale][0] {
  _type,
  title,
  "slug": slug.current,
  "locale": language,
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    "slug": slug.current,
    "locale": language
  },
  content[] {
    ${modules}
  },
  seo {
    ${seoFields}
  }
}`;

// Product query
export const productQuery = `*[_type == "product" && slug.current == $slug && language == $locale][0] {
  _type,
  title,
  "slug": slug.current,
  "locale": language,
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    "slug": slug.current,
    "locale": language
  },
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
  "variants": [],
  seo {
    ${seoFields}
  }
}`;

// Category query
export const categoryQuery = `*[_type == "category" && slug.current == $slug && language == $locale][0] {
  _type,
  title,
  "slug": slug.current,
  "locale": language,
  image {
    ${imageFields}
  },
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    "slug": slug.current,
    "locale": language
  },
  seo {
    ${seoFields}
  }
}`;

// Categories query
export const mainMenuQuery = `*[_type == "category" && language == $locale] | order(title asc) {
  _type,
  title,
  "slug": slug.current,
  "locale": language,
}`;

// Footer menu query
export const footerMenusQuery = `*[_type == "footerMenu" && language == $locale] | order(title asc) {
  _type,
  title,
  "locale": language,
  menu {
    title,
    links[] {
      _type,
      title,
      reference-> {
        slug,
        "locale": language
      },
      url,
      newWindow
    }
  }
}`;

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
}`;
