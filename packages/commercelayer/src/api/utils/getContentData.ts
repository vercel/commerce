import { Product } from '@vercel/commerce/types/Product'
import { CONTENT_DATA_URL } from '../../const'

export type Products = (Product & { categoryId: string; brandId: string })[]

export default async function getContentData(id?: string): Promise<Products> {
  const products = (await (await fetch(CONTENT_DATA_URL)).json()).products as Products
  return !id ? products : products.filter((p) => p.id === id)
}
