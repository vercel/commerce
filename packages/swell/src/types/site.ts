export * from '@vercel/commerce/types/site'
import { Category } from "@vercel/commerce/types/site"

export type SwellCategory = Category & {
  children?: {
    results: Category[]
  }
}