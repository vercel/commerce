import { Product } from '@vercel/commerce/types/Product'

export type Products = (Product & { categoryId: string; brandId: string })[]

export default async function getContentData(id?: string): Promise<Products> {
  const url = process.env.NEXT_PUBLIC_COMMERCELAYER_CONTENT_DATA_URL as string
  const products = (await (await fetch(url)).json()).products as Products
  return !id ? products : products.filter((p) => p.id === id)
}
