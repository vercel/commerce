// Rich text annotations used in the block content editor
// import annotationLinkEmail from './annotations/linkEmail'
// import annotationLinkExternal from './annotations/linkExternal'
// import annotationLinkInternal from './annotations/linkInternal'
// import annotationProduct from './annotations/product'

// const annotations = [
//   annotationLinkEmail,
//   annotationLinkExternal,
//   annotationLinkInternal,
//   annotationProduct,
// ]

// Document types
import category from './documents/category'
import page from './documents/page'
import product from './documents/product'
import productVariant from './documents/productVariant'
import blurb from './documents/blurb'
import section from './documents/section'
import usp from './documents/usp'
import footerMenu from './documents/footerMenu'

const documents = [
  category,
  page,
  product,
  productVariant,
  blurb,
  section,
  usp,
  footerMenu
]

// Singleton document types
import home from './singletons/home'
import settings from './singletons/settings'
import utilityMenu from './singletons/utilityMenu'
// import navigation from './singletons/navigation'

const singletons = [home, settings, utilityMenu]

// Block content
import body from './blocks/body'

const blocks = [body]

// Object types
import banner from './objects/banner'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import hero from './objects/hero'
import seo from './objects/seo'
import mainImage from './objects/mainImage'
import slider from './objects/slider'
import blurbSection from './objects/blurbSection'
import filteredProductList from './objects/filteredProductList'
import uspSection from './objects/uspSection'
import reusableSection from './objects/reusableSection'
import menu from './objects/menu'

const objects = [
  linkExternal,
  linkInternal,
  hero,
  seo,
  mainImage,
  slider,
  filteredProductList,
  banner,
  blurbSection,
  uspSection,
  reusableSection,
  menu
]

export const schemaTypes = [
  // ...annotations,
  ...documents,
  ...singletons,
  ...objects,
  ...blocks
]
