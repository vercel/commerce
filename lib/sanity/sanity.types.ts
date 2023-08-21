import type { Image } from 'sanity'

export interface HomePagePayload {
  content?: []
  title?: string
  _type?: string
  seo?: {
    title?: string;
    description?: string;
    image: Image
  }
}

export interface PagePayload {
  content?: []
  title?: string
  _type?: string
  slug?: string
  seo?: {
    title?: string;
    description?: string;
    image: Image
  }
}

export interface ProductPayload {
  title?: string
  name?: string
  description?: string
  images?: Image[]
  currencyCode?: string
  _type?: string
  slug?: string
  seo?: {
    title?: string;
    description?: string;
    image: Image
  }
}

export interface CategoryPayload {
  title?: string
  _type?: string
  slug?: string
  seo?: {
    title?: string;
    description?: string;
    image: Image
  }
}

export interface SearchPayload {
  title?: string
  _type?: string
  slug?: string
  seo?: {
    title?: string;
    description?: string;
    image: Image
  }
}

export interface MainMenuPayload {
  title?: string
  _type?: string
  items: []
}