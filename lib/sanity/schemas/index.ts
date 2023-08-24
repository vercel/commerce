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
import blurb from './documents/blurb'
import category from './documents/category'
import footerMenu from './documents/footerMenu'
import page from './documents/page'
import product from './documents/product'
import section from './documents/section'
import usp from './documents/usp'

const documents = [
  category,
  page,
  product,
  blurb,
  section,
  usp,
  footerMenu
]

// Singleton document types
import home from './singletons/home'
import search from './singletons/search'
import settings from './singletons/settings'
import utilityMenu from './singletons/utilityMenu'

const singletons = [home, settings, utilityMenu, search]

// Block content
import body from './blocks/body'

const blocks = [body]

// Object types
import banner from './objects/banner'
import blurbSection from './objects/blurbSection'
import filteredProductList from './objects/filteredProductList'
import hero from './objects/hero'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import mainImage from './objects/mainImage'
import menu from './objects/menu'
import reusableSection from './objects/reusableSection'
import seo from './objects/seo'
import slider from './objects/slider'
import uspSection from './objects/uspSection'

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
